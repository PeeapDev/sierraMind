"use strict";

// open modal
$(".open-folder-modal").on('click', function () {
    $(".folder-modal").css("display", "flex");
});

//close modal
$(".modal-close-btn").on('click', function () {
    $(".folder-modal").css("display", "none");
});

$(document).on('click', '.rename-folder', function () {
    $('#folderUpdateSubmit #folder_id').attr('data-id', $(this).attr('id'));
    $('#rename_folder_name').val($(this).attr('data-name'));
});

$(document).on('submit', '#folderUpdateSubmit', function(e) {
    e.preventDefault();

    var gridView = $('.toggleView').prop('checked');
    var id = $('#folder_id').data('id');
    $.ajax({
        url: SITE_URL + '/user/folder-update',
        type:'POST',
        data:{
            'folder_id': id,
            'name': $('#rename_folder_name').val(),
            'user_id' : $('#userId').val(),
            '_token': CSRF_TOKEN
        },
        dataType:'JSON',
        beforeSend: () => {
            $(".folder-rename-loader").removeClass("hidden");
        },
        success: function (response) {
            if (response.response.status == 'success') {
                $('#folder-'+ id).remove();
                let html;
                if (gridView) {
                    html = addGridView(response.data, '!bg-[#D6C5EB] dark:!bg-[#504163]');
                } else {
                    html = addListView(response.data, '!bg-[#D6C5EB] dark:!bg-[#504163]');
                }
                $('#documents-table-body .drive-table-head').after(html);
                $('.close-popup').trigger('click');
                $('#rename_folder_name').val('');
                gridAndListView();
            }

            toastMixin.fire({
                title: response.response.message,
                icon: response.response.status == 'fail' ? 'error' : response.response.status,
            });
        },
        complete: () => {
            $(".folder-rename-loader").addClass("hidden");
        },
        error: function(data) {
            var jsonData = JSON.parse(data.responseText);
            var message = jsonData.message;

            toastMixin.fire({
                title: message,
                icon: 'error',
            });
        }
    })
});

$(document).on('submit', '#folderCreateSubmit', function(e) {
    e.preventDefault();

    var gridView = $('.toggleView').prop('checked');
    $.ajax({
        url: SITE_URL + '/user/folder-create',
        type:'POST',
        data:{
            'name': $('#folder_name').val(),
            'user_id' : $('#user_id').val(),
            'parent_id': parent_id !== '' ? $('#parent_id').val() : undefined,
            '_token': CSRF_TOKEN
        },
        dataType:'JSON',
        beforeSend: () => {
            $(".folder-loader").removeClass("hidden");
        },
        success: function (response) {
            if (response.response.status == 'success') {
                let html;
                if (gridView) {
                    html = addGridView(response.data, '');
                } else {
                    html = addListView(response.data, '');
                }

                if ($('.container-box').children().length == 1) {
                    $('.folder-tittle').removeClass("!hidden");
                }

                $('#folder_name').val('');
                $('#documents-table-body .drive-table-head').after(html);
                if ($('#documents-table-body').hasClass('hidden')) {
                    $('#documents-table-body').removeClass("hidden");
                    $('.no-folder').addClass("hidden");
                }
                $('.close-popup').trigger('click');
                
                gridAndListView();
            }

            toastMixin.fire({
                title: response.response.message,
                icon: response.response.status == 'fail' ? 'error' : response.response.status,
            });
        },
        complete: () => {
            $(".folder-loader").addClass("hidden");
        },
        error: function(data) {
            var jsonData = JSON.parse(data.responseText);
            var message = jsonData.message;

            toastMixin.fire({
                title: message,
                icon: 'error',
            });
        }
    })
});

function addGridView(data, activeClass) {
    return `
    <div id="folder-${data.id}" class="non-favorite search-folder folder-item relative view-mode view-box cutom-border-active bg-white dark:bg-color-3A cursor-pointer p-4 rounded-xl h-[132px] dark:border-b-color-3A grid-view ${activeClass}" type="folder">
        <a href="${data.view_route}" onclick="return false;">
            <div class="flex gap-4 sm:gap-px content-parent justify-between">
                    <div class="flex gap-3 file-name flex-col">
                        <svg class="w-7 h-7 text-[#FCCA19]" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.0552 3.375H15.535C15.8476 3.37497 16.1569 3.4401 16.443 3.56624C16.729 3.69238 16.9857 3.87676 17.1966 4.10762C17.4074 4.33848 17.5678 4.61076 17.6676 4.90707C17.7674 5.20339 17.8043 5.51725 17.776 5.82863L17.0594 13.7036C17.0086 14.2627 16.7506 14.7825 16.3362 15.1611C15.9218 15.5397 15.3808 15.7498 14.8195 15.75H3.17685C2.61552 15.7498 2.07455 15.5397 1.66013 15.1611C1.24571 14.7825 0.98778 14.2627 0.93698 13.7036L0.220355 5.82863C0.172414 5.30751 0.308548 4.78606 0.605105 4.35488L0.56123 3.375C0.56123 2.77826 0.798283 2.20597 1.22024 1.78401C1.6422 1.36205 2.21449 1.125 2.81123 1.125H6.94223C7.53892 1.12513 8.11112 1.36226 8.53298 1.78425L9.46448 2.71575C9.88634 3.13774 10.4585 3.37487 11.0552 3.375ZM1.69298 3.51C1.93373 3.42225 2.19248 3.375 2.46248 3.375H8.53298L7.73761 2.57963C7.52668 2.36863 7.24057 2.25006 6.94223 2.25H2.81123C2.51653 2.24995 2.23357 2.36553 2.0232 2.57191C1.81282 2.77829 1.69183 3.05898 1.68623 3.35362L1.69298 3.51Z" fill="currentColor"></path>
                        </svg>
                        
                        <div class="flex flex-col">
                            <p class="text-color-14 dark:text-white font-Figtree absolute bottom-4 line-clamp-double mr-4 text-13 font-normal word-break">
                                ${data.name}
                            </p>
                            <p class="mt-2 modified-time text-color-89 font-Figtree absolute bottom-4 line-clamp-double mr-4 text-13 font-normal hidden">2 hours ago</p>
                        </div>
                    </div>
                <div class="check-data flex-1 xl:inline-flex bookmark-folder hidden absolute top-[54px] left-[19px]">
                    <a href="javascript: void(0)" class="inline-block folder-bookmark-${data.id}" title="Bookmarks" onclick="fileBookmarkToggle(this)" data-file-type="folder" data-file-id="${data.id}" data-is-favorite="false">
                        <svg class="unmarked-behind" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.75 1.75V13.5625C0.75 13.7169 0.831395 13.8599 0.964172 13.9387C1.09695 14.0175 1.26144 14.0205 1.397 13.9466L6 11.4359L10.603 13.9466C10.7386 14.0205 10.9031 14.0175 11.0358 13.9387C11.1686 13.8599 11.25 13.7169 11.25 13.5625V1.75C11.25 0.783502 10.4665 0 9.5 0H2.5C1.5335 0 0.75 0.783502 0.75 1.75Z" fill="#898989"/>
                        </svg>    
                    </a>
                    <div class="document-spinner"></div>
                </div>
                <div class="check-data flex-1 media-stash hidden">
                    <span class="text-color-89 font-Figtree text-13 font-medium">
                        ${data.items}
                    </span>
                </div>
                <div class="check-data w-[100px] 2xl:w-[207px] hidden">
                    <span class="text-color-89 font-Figtree text-13 font-medium">
                        ${data.creator}
                    </span>
                </div>
                <div class="flex-1 hidden modified">
                    <span class="text-color-89 font-Figtree text-13 font-medium">
                        ${data.date}
                    </span>
                </div>
                <div class="w-[67px] flex justify-end max-sm:flex-1">
                    <div class="relative inline-block">
                        <button class="table-dropdown-click">
                            <a href="javascript:void(0)" class="cursor-pointer text-color-14 dark:text-white dark:border-color-47 flex justify-end action-dot absolute top-0 -left-2">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.5 13C9.5 13.8284 8.82843 14.5 8 14.5C7.17157 14.5 6.5 13.8284 6.5 13C6.5 12.1716 7.17157 11.5 8 11.5C8.82843 11.5 9.5 12.1716 9.5 13ZM9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8ZM9.5 3C9.5 3.82843 8.82843 4.5 8 4.5C7.17157 4.5 6.5 3.82843 6.5 3C6.5 2.17157 7.17157 1.5 8 1.5C8.82843 1.5 9.5 2.17157 9.5 3Z" fill="currentColor"></path>
                                </svg>
                            </a>
                        </button>
                        <div class="absolute action-dropdown mt-2 w-[180px] sm:w-[201px] border border-color-89 dark:border-color-47 rounded-lg bg-white dark:bg-[#333332] z-50 table-drop-body dropdown-shadow ltr:right-0 rtl:left-0">
                            <div class="my-2">
                                <a href="javascript:void(0)" data-id="${data.id}" onclick="downloadFolder(this)" class="flex justify-start items-center gap-2 text-14 font-normal text-color-14 dark:text-white font-Figtree px-4 py-2 hover:bg-color-F6 dark:hover:bg-[#3A3A39] text-left">
                                    <span class="w-4 h-4">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 2C8.36819 2 8.66667 2.29848 8.66667 2.66667V9.05719L10.8619 6.86193C11.1223 6.60158 11.5444 6.60158 11.8047 6.86193C12.0651 7.12228 12.0651 7.54439 11.8047 7.80474L8.4714 11.1381C8.21106 11.3984 7.78895 11.3984 7.5286 11.1381L4.19526 7.80474C3.93491 7.54439 3.93491 7.12228 4.19526 6.86193C4.45561 6.60158 4.87772 6.60158 5.13807 6.86193L7.33333 9.05719V2.66667C7.33333 2.29848 7.63181 2 8 2ZM2.66667 10.6667C3.03486 10.6667 3.33333 10.9651 3.33333 11.3333V12.6667C3.33333 12.8435 3.40357 13.013 3.5286 13.1381C3.65362 13.2631 3.82319 13.3333 4 13.3333H12C12.1768 13.3333 12.3464 13.2631 12.4714 13.1381C12.5964 13.013 12.6667 12.8435 12.6667 12.6667V11.3333C12.6667 10.9651 12.9651 10.6667 13.3333 10.6667C13.7015 10.6667 14 10.9651 14 11.3333V12.6667C14 13.1971 13.7893 13.7058 13.4142 14.0809C13.0391 14.456 12.5304 14.6667 12 14.6667H4C3.46957 14.6667 2.96086 14.456 2.58579 14.0809C2.21071 13.7058 2 13.1971 2 12.6667V11.3333C2 10.9651 2.29848 10.6667 2.66667 10.6667Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    <p>${jsLang('Download')}</p>
                                </a>
                                <a id="${data.id}" data-name="${data.name}" href="javascript:void(0)" data-target="rename-popup" data-effect="mfp-zoom-in" class="modal-trigger rename-folder flex justify-start items-center gap-2 text-14 font-normal text-color-14 dark:text-white font-Figtree px-4 py-2 hover:bg-color-F6 dark:hover:bg-[#3A3A39] text-left">
                                    <span class="w-4 h-4">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.66797 14.0002C1.66797 13.632 1.96645 13.3335 2.33464 13.3335H14.3346C14.7028 13.3335 15.0013 13.632 15.0013 14.0002C15.0013 14.3684 14.7028 14.6668 14.3346 14.6668H2.33464C1.96645 14.6668 1.66797 14.3684 1.66797 14.0002Z" fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5649 1.3335C10.7418 1.33346 10.9114 1.40374 11.0365 1.52886L13.4715 3.96485C13.7317 4.22518 13.7317 4.64714 13.4715 4.90746L6.57717 11.8048C6.45214 11.9299 6.28253 12.0002 6.10567 12.0002H3.66667C3.29848 12.0002 3 11.7017 3 11.3335V8.90683C3 8.73016 3.07013 8.56071 3.19498 8.43571L10.0933 1.52904C10.2183 1.40388 10.388 1.33353 10.5649 1.3335ZM10.5652 2.94335L4.33333 9.18274V10.6668H5.82944L12.0574 4.43617L10.5652 2.94335Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    <p>${jsLang('Rename')}</p>
                                </a>
                                <a href="javascript:void(0)" id="drive-modal" data-target="move-folder-mod" data-effect="mfp-zoom-in" class="modal-trigger flex justify-start items-center gap-2 text-14 font-normal text-color-14 dark:text-white font-Figtree px-4 py-2 hover:bg-color-F6 dark:hover:bg-[#3A3A39] text-left"
                                data-id="${data.id}" data-type="folder" data-content="${data.name}">
                                    <span class="w-4 h-4">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.332 11.9998H2.66536V5.33317H13.332V11.9998ZM7.9987 3.99984L6.66536 2.6665H2.66536C2.31174 2.6665 1.9726 2.80698 1.72256 3.05703C1.47251 3.30708 1.33203 3.64622 1.33203 3.99984V11.9998C1.33203 12.3535 1.47251 12.6926 1.72256 12.9426C1.9726 13.1927 2.31174 13.3332 2.66536 13.3332H13.332C14.072 13.3332 14.6654 12.7398 14.6654 11.9998V5.33317C14.6654 4.97955 14.5249 4.64041 14.2748 4.39036C14.0248 4.14031 13.6857 3.99984 13.332 3.99984H7.9987ZM7.33203 9.33317V7.99984H9.9987V5.99984L12.6654 8.6665L9.9987 11.3332V9.33317H7.33203Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    <p>${jsLang('Move')}</p>
                                </a>
                                <a href="javascript:void(0)" class="folder-grid-bookmark-${data.id} bookmark-option flex justify-start items-center gap-2 text-14 font-normal text-color-14 dark:text-white font-Figtree px-4 py-2 hover:bg-color-F6 dark:hover:bg-[#3A3A39] text-left"
                                    onclick="gridViewBookmarkToggle(this)" data-file-type="folder" data-file-id="${data.id}" data-is-favorite="false">
                                    <span class="w-4 h-4">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.33464 1.3335H12.668C12.8448 1.3335 13.0143 1.40373 13.1394 1.52876C13.2644 1.65378 13.3346 1.82335 13.3346 2.00016V14.7622C13.3347 14.8218 13.3188 14.8803 13.2886 14.9317C13.2583 14.983 13.2149 15.0254 13.1627 15.0542C13.1106 15.0831 13.0516 15.0974 12.9921 15.0958C12.9325 15.0941 12.8744 15.0765 12.824 15.0448L8.0013 12.0202L3.17864 15.0442C3.12821 15.0758 3.07023 15.0934 3.0107 15.0951C2.95118 15.0968 2.89229 15.0825 2.84017 15.0537C2.78804 15.0249 2.74457 14.9827 2.71429 14.9314C2.68401 14.8802 2.66801 14.8217 2.66797 14.7622V2.00016C2.66797 1.82335 2.73821 1.65378 2.86323 1.52876C2.98826 1.40373 3.15782 1.3335 3.33464 1.3335ZM12.0013 2.66683H4.0013V12.9548L8.0013 10.4475L12.0013 12.9548V2.66683Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    <p>${jsLang('Bookmark')}</p>
                                </a>
                                <a id="${data.id}" data-type="folder" href="javascript:void(0)" data-target="delete-popup" data-effect="mfp-zoom-in" class="modal-trigger flex justify-start items-center gap-2 text-14 font-normal text-color-14 dark:text-white font-Figtree px-4 py-2 hover:bg-color-F6 dark:hover:bg-[#3A3A39] text-left">
                                    <span class="w-4 h-4">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.43967 0.666504H8.55773C8.90916 0.666493 9.21233 0.666482 9.46205 0.686885C9.72561 0.708419 9.98776 0.755963 10.24 0.884492C10.6163 1.07624 10.9223 1.3822 11.114 1.75852C11.2426 2.01078 11.2901 2.27292 11.3117 2.53649C11.3299 2.76034 11.3318 3.02715 11.332 3.33317H13.9987C14.3669 3.33317 14.6654 3.63165 14.6654 3.99984C14.6654 4.36803 14.3669 4.66651 13.9987 4.66651H13.332V11.4941C13.332 12.0307 13.332 12.4736 13.3026 12.8344C13.272 13.2091 13.2062 13.5536 13.0414 13.8771C12.7857 14.3789 12.3778 14.7869 11.876 15.0425C11.5524 15.2074 11.208 15.2731 10.8332 15.3037C10.4725 15.3332 10.0296 15.3332 9.49291 15.3332H6.50448C5.96784 15.3332 5.52494 15.3332 5.16415 15.3037C4.78942 15.2731 4.44495 15.2074 4.12139 15.0425C3.61962 14.7869 3.21168 14.3789 2.95601 13.8771C2.79115 13.5536 2.72544 13.2091 2.69483 12.8344C2.66535 12.4736 2.66536 12.0307 2.66536 11.494L2.66536 4.66651H1.9987C1.63051 4.66651 1.33203 4.36803 1.33203 3.99984C1.33203 3.63165 1.63051 3.33317 1.9987 3.33317H4.66538C4.66557 3.02715 4.66745 2.76034 4.68574 2.53649C4.70728 2.27292 4.75482 2.01078 4.88335 1.75852C5.0751 1.3822 5.38106 1.07624 5.75738 0.884492C6.00964 0.755963 6.27178 0.708419 6.53535 0.686885C6.78506 0.666482 7.08824 0.666493 7.43967 0.666504ZM3.9987 4.66651V11.4665C3.9987 12.0376 3.99922 12.4258 4.02373 12.7258C4.04761 13.0181 4.0909 13.1676 4.14402 13.2718C4.27185 13.5227 4.47583 13.7267 4.72671 13.8545C4.83098 13.9076 4.98045 13.9509 5.27272 13.9748C5.57278 13.9993 5.96098 13.9998 6.53203 13.9998H9.46536C10.0364 13.9998 10.4246 13.9993 10.7247 13.9748C11.0169 13.9509 11.1664 13.9076 11.2707 13.8545C11.5216 13.7267 11.7255 13.5227 11.8534 13.2718C11.9065 13.1676 11.9498 13.0181 11.9737 12.7258C11.9982 12.4258 11.9987 12.0376 11.9987 11.4665V4.66651H3.9987ZM9.99865 3.33317H5.99875C5.99904 3.0231 6.00108 2.81116 6.01465 2.64506C6.02945 2.46395 6.05456 2.39681 6.07136 2.36384C6.13528 2.2384 6.23726 2.13642 6.3627 2.0725C6.39567 2.05571 6.46281 2.03059 6.64392 2.01579C6.83281 2.00036 7.081 1.99984 7.46536 1.99984H8.53203C8.9164 1.99984 9.16458 2.00036 9.35347 2.01579C9.53458 2.03059 9.60173 2.05571 9.63469 2.0725C9.76013 2.13642 9.86212 2.2384 9.92603 2.36384C9.94283 2.39681 9.96795 2.46395 9.98275 2.64506C9.99632 2.81116 9.99835 3.0231 9.99865 3.33317ZM6.66536 6.99984C7.03355 6.99984 7.33203 7.29832 7.33203 7.66651V10.9998C7.33203 11.368 7.03355 11.6665 6.66536 11.6665C6.29717 11.6665 5.9987 11.368 5.9987 10.9998V7.66651C5.9987 7.29832 6.29717 6.99984 6.66536 6.99984ZM9.33203 6.99984C9.70022 6.99984 9.9987 7.29832 9.9987 7.66651V10.9998C9.9987 11.368 9.70022 11.6665 9.33203 11.6665C8.96384 11.6665 8.66536 11.368 8.66536 10.9998V7.66651C8.66536 7.29832 8.96384 6.99984 9.33203 6.99984Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    <p>${jsLang('Delete')}</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    `;
           
}

function addListView(data, activeClass) {
    return `
    <div id="folder-${data.id}" class="non-favorite search-folder folder-item relative view-mode list-view view-box cutom-border-active bg-white dark:bg-color-3A cursor-pointer py-[15px] sm:py-6 px-4 sm:px-6 ${activeClass}" type="folder">
        <a href="${data.view_route}" onclick="return false;">
            <div class="flex gap-4 sm:gap-px sm:items-center content-parent">
                <div class="flex sm:items-center gap-3 w-[175px] min-[990px]:w-[348px] xl:w-[400px] 5xl:w-[492px] min-[1730px]:w-[615px] xl:pr-[65px] file-name">
                    <div>
                        <svg class=" text-[#FF774B]" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.0552 3.375H15.535C15.8476 3.37497 16.1569 3.4401 16.443 3.56624C16.729 3.69238 16.9857 3.87676 17.1966 4.10762C17.4074 4.33848 17.5678 4.61076 17.6676 4.90707C17.7674 5.20339 17.8043 5.51725 17.776 5.82863L17.0594 13.7036C17.0086 14.2627 16.7506 14.7825 16.3362 15.1611C15.9218 15.5397 15.3808 15.7498 14.8195 15.75H3.17685C2.61552 15.7498 2.07455 15.5397 1.66013 15.1611C1.24571 14.7825 0.98778 14.2627 0.93698 13.7036L0.220355 5.82863C0.172414 5.30751 0.308548 4.78606 0.605105 4.35488L0.56123 3.375C0.56123 2.77826 0.798283 2.20597 1.22024 1.78401C1.6422 1.36205 2.21449 1.125 2.81123 1.125H6.94223C7.53892 1.12513 8.11112 1.36226 8.53298 1.78425L9.46448 2.71575C9.88634 3.13774 10.4585 3.37487 11.0552 3.375ZM1.69298 3.51C1.93373 3.42225 2.19248 3.375 2.46248 3.375H8.53298L7.73761 2.57963C7.52668 2.36863 7.24057 2.25006 6.94223 2.25H2.81123C2.51653 2.24995 2.23357 2.36553 2.0232 2.57191C1.81282 2.77829 1.69183 3.05898 1.68623 3.35362L1.69298 3.51Z" fill="currentColor"/>
                        </svg>
                    </div>
                    
                    <div class="flex flex-col">
                        <p class="text-color-14 w-[145px] min-[990px]:w-[300px] 5xl:w-[492px] dark:text-white text-14 font-Figtree font-medium line-clamp-2 sm:line-clamp-1">
                            ${data.name}
                        </p>
                        <p class="mt-2 block sm:hidden modified-time text-color-89 font-Figtree text-13 font-medium">2 hours ago</p>
                    </div>
                </div>
                <div class="check-data flex-1 hidden xl:inline-flex bookmark-folder">
                        <a href="javascript: void(0)" class="inline-block folder-bookmark-${data.id}" title="Bookmarks"  onclick="fileBookmarkToggle(this)" data-file-type="folder" data-file-id="${data.id}" data-is-favorite="false">
                        
                            <svg class="unmarked-behind" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.75 1.75V13.5625C0.75 13.7169 0.831395 13.8599 0.964172 13.9387C1.09695 14.0175 1.26144 14.0205 1.397 13.9466L6 11.4359L10.603 13.9466C10.7386 14.0205 10.9031 14.0175 11.0358 13.9387C11.1686 13.8599 11.25 13.7169 11.25 13.5625V1.75C11.25 0.783502 10.4665 0 9.5 0H2.5C1.5335 0 0.75 0.783502 0.75 1.75Z" fill="#898989"/>
                            </svg>
                    </a>
                    <div class="document-spinner"></div>
                </div>
                <div class="check-data flex-1 hidden xl:inline-flex media-stash">
                    <span class="text-color-89 font-Figtree text-13 font-medium">
                    ${data.items}
                    </span>
                </div>
                <div class="check-data w-[100px] 2xl:w-[207px]">
                    <span class="text-color-89 font-Figtree text-13 font-medium">
                        ${data.creator}
                    </span>
                </div>
                <div class="flex-1 hidden sm:inline-flex modified">
                    <span class="text-color-89 font-Figtree text-13 font-medium">
                        ${data.date}
                    </span>
                </div>
                <div class="w-[67px] flex justify-end max-sm:flex-1">
                    <div class="relative inline-block">
                        <button class="table-dropdown-click">
                            <a href="javascript:void(0)" class="cursor-pointer text-color-14 dark:text-white border p-[7px] border-color-89 dark:border-color-47 dark:bg-color-47 rounded-lg flex justify-end action-dot">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.5 13C9.5 13.8284 8.82843 14.5 8 14.5C7.17157 14.5 6.5 13.8284 6.5 13C6.5 12.1716 7.17157 11.5 8 11.5C8.82843 11.5 9.5 12.1716 9.5 13ZM9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8ZM9.5 3C9.5 3.82843 8.82843 4.5 8 4.5C7.17157 4.5 6.5 3.82843 6.5 3C6.5 2.17157 7.17157 1.5 8 1.5C8.82843 1.5 9.5 2.17157 9.5 3Z" fill="currentColor"/>
                                </svg>
                            </a>
                        </button>
                        <div class="absolute ltr:right-9 rtl:left-9 action-dropdown -top-2 mt-2 w-[180px] sm:w-[201px] border border-color-89 dark:border-color-47 rounded-lg bg-white dark:bg-[#333332] z-50 table-drop-body dropdown-shadow">
                            <div class="my-2">
                                <a href="javascript:void(0)" data-id="${data.id }}" onclick="downloadFolder(this)" class="flex justify-start items-center gap-2 text-14 font-normal text-color-14 dark:text-white font-Figtree px-4 py-2 hover:bg-color-F6 dark:hover:bg-[#3A3A39] text-left">
                                    <span class="w-4 h-4">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 2C8.36819 2 8.66667 2.29848 8.66667 2.66667V9.05719L10.8619 6.86193C11.1223 6.60158 11.5444 6.60158 11.8047 6.86193C12.0651 7.12228 12.0651 7.54439 11.8047 7.80474L8.4714 11.1381C8.21106 11.3984 7.78895 11.3984 7.5286 11.1381L4.19526 7.80474C3.93491 7.54439 3.93491 7.12228 4.19526 6.86193C4.45561 6.60158 4.87772 6.60158 5.13807 6.86193L7.33333 9.05719V2.66667C7.33333 2.29848 7.63181 2 8 2ZM2.66667 10.6667C3.03486 10.6667 3.33333 10.9651 3.33333 11.3333V12.6667C3.33333 12.8435 3.40357 13.013 3.5286 13.1381C3.65362 13.2631 3.82319 13.3333 4 13.3333H12C12.1768 13.3333 12.3464 13.2631 12.4714 13.1381C12.5964 13.013 12.6667 12.8435 12.6667 12.6667V11.3333C12.6667 10.9651 12.9651 10.6667 13.3333 10.6667C13.7015 10.6667 14 10.9651 14 11.3333V12.6667C14 13.1971 13.7893 13.7058 13.4142 14.0809C13.0391 14.456 12.5304 14.6667 12 14.6667H4C3.46957 14.6667 2.96086 14.456 2.58579 14.0809C2.21071 13.7058 2 13.1971 2 12.6667V11.3333C2 10.9651 2.29848 10.6667 2.66667 10.6667Z" fill="currentColor"/>
                                        </svg>
                                    </span>
                                    <p>${jsLang('Download')}</p>
                                </a>
                                <a id="${data.id}" data-name="${data.name}" href="javascript:void(0)" data-target="rename-popup" data-effect="mfp-zoom-in" class="modal-trigger rename-folder flex justify-start items-center gap-2 text-14 font-normal text-color-14 dark:text-white font-Figtree px-4 py-2 hover:bg-color-F6 dark:hover:bg-[#3A3A39] text-left">
                                    <span class="w-4 h-4">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.66797 14.0002C1.66797 13.632 1.96645 13.3335 2.33464 13.3335H14.3346C14.7028 13.3335 15.0013 13.632 15.0013 14.0002C15.0013 14.3684 14.7028 14.6668 14.3346 14.6668H2.33464C1.96645 14.6668 1.66797 14.3684 1.66797 14.0002Z" fill="currentColor"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5649 1.3335C10.7418 1.33346 10.9114 1.40374 11.0365 1.52886L13.4715 3.96485C13.7317 4.22518 13.7317 4.64714 13.4715 4.90746L6.57717 11.8048C6.45214 11.9299 6.28253 12.0002 6.10567 12.0002H3.66667C3.29848 12.0002 3 11.7017 3 11.3335V8.90683C3 8.73016 3.07013 8.56071 3.19498 8.43571L10.0933 1.52904C10.2183 1.40388 10.388 1.33353 10.5649 1.3335ZM10.5652 2.94335L4.33333 9.18274V10.6668H5.82944L12.0574 4.43617L10.5652 2.94335Z" fill="currentColor"/>
                                        </svg>
                                    </span>
                                    <p>${jsLang('Rename')}</p>
                                </a>
                                <a href="javascript:void(0)" id="drive-modal" data-target="move-folder-mod" data-effect="mfp-zoom-in" class="modal-trigger flex justify-start items-center gap-2 text-14 font-normal text-color-14 dark:text-white font-Figtree px-4 py-2 hover:bg-color-F6 dark:hover:bg-[#3A3A39] text-left"
                                data-id="${data.id}" data-type="folder" data-content="${data.name}">
                                    <span class="w-4 h-4">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.332 11.9998H2.66536V5.33317H13.332V11.9998ZM7.9987 3.99984L6.66536 2.6665H2.66536C2.31174 2.6665 1.9726 2.80698 1.72256 3.05703C1.47251 3.30708 1.33203 3.64622 1.33203 3.99984V11.9998C1.33203 12.3535 1.47251 12.6926 1.72256 12.9426C1.9726 13.1927 2.31174 13.3332 2.66536 13.3332H13.332C14.072 13.3332 14.6654 12.7398 14.6654 11.9998V5.33317C14.6654 4.97955 14.5249 4.64041 14.2748 4.39036C14.0248 4.14031 13.6857 3.99984 13.332 3.99984H7.9987ZM7.33203 9.33317V7.99984H9.9987V5.99984L12.6654 8.6665L9.9987 11.3332V9.33317H7.33203Z" fill="currentColor"/>
                                        </svg>
                                    </span>
                                    <p>${jsLang('Move')}</p>
                                </a>
                                <a href="javascript:void(0)" class="folder-grid-bookmark-${data.id} bookmark-option hidden flex justify-start items-center gap-2 text-14 font-normal text-color-14 dark:text-white font-Figtree px-4 py-2 hover:bg-color-F6 dark:hover:bg-[#3A3A39] text-left"
                                onclick="gridViewBookmarkToggle(this)" data-file-type="folder" data-file-id="${data.id}" data-is-favorite="false">
                                    <span class="w-4 h-4">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.33464 1.3335H12.668C12.8448 1.3335 13.0143 1.40373 13.1394 1.52876C13.2644 1.65378 13.3346 1.82335 13.3346 2.00016V14.7622C13.3347 14.8218 13.3188 14.8803 13.2886 14.9317C13.2583 14.983 13.2149 15.0254 13.1627 15.0542C13.1106 15.0831 13.0516 15.0974 12.9921 15.0958C12.9325 15.0941 12.8744 15.0765 12.824 15.0448L8.0013 12.0202L3.17864 15.0442C3.12821 15.0758 3.07023 15.0934 3.0107 15.0951C2.95118 15.0968 2.89229 15.0825 2.84017 15.0537C2.78804 15.0249 2.74457 14.9827 2.71429 14.9314C2.68401 14.8802 2.66801 14.8217 2.66797 14.7622V2.00016C2.66797 1.82335 2.73821 1.65378 2.86323 1.52876C2.98826 1.40373 3.15782 1.3335 3.33464 1.3335ZM12.0013 2.66683H4.0013V12.9548L8.0013 10.4475L12.0013 12.9548V2.66683Z" fill="currentColor"/>
                                        </svg>
                                    </span>
                                    <p>${jsLang('Bookmark')}</p>
                                </a>
                                <a id="${data.id}" data-type="folder" href="javascript:void(0)" data-target="delete-popup" data-effect="mfp-zoom-in" class="modal-trigger flex justify-start items-center gap-2 text-14 font-normal text-color-14 dark:text-white font-Figtree px-4 py-2 hover:bg-color-F6 dark:hover:bg-[#3A3A39] text-left">
                                    <span class="w-4 h-4">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.43967 0.666504H8.55773C8.90916 0.666493 9.21233 0.666482 9.46205 0.686885C9.72561 0.708419 9.98776 0.755963 10.24 0.884492C10.6163 1.07624 10.9223 1.3822 11.114 1.75852C11.2426 2.01078 11.2901 2.27292 11.3117 2.53649C11.3299 2.76034 11.3318 3.02715 11.332 3.33317H13.9987C14.3669 3.33317 14.6654 3.63165 14.6654 3.99984C14.6654 4.36803 14.3669 4.66651 13.9987 4.66651H13.332V11.4941C13.332 12.0307 13.332 12.4736 13.3026 12.8344C13.272 13.2091 13.2062 13.5536 13.0414 13.8771C12.7857 14.3789 12.3778 14.7869 11.876 15.0425C11.5524 15.2074 11.208 15.2731 10.8332 15.3037C10.4725 15.3332 10.0296 15.3332 9.49291 15.3332H6.50448C5.96784 15.3332 5.52494 15.3332 5.16415 15.3037C4.78942 15.2731 4.44495 15.2074 4.12139 15.0425C3.61962 14.7869 3.21168 14.3789 2.95601 13.8771C2.79115 13.5536 2.72544 13.2091 2.69483 12.8344C2.66535 12.4736 2.66536 12.0307 2.66536 11.494L2.66536 4.66651H1.9987C1.63051 4.66651 1.33203 4.36803 1.33203 3.99984C1.33203 3.63165 1.63051 3.33317 1.9987 3.33317H4.66538C4.66557 3.02715 4.66745 2.76034 4.68574 2.53649C4.70728 2.27292 4.75482 2.01078 4.88335 1.75852C5.0751 1.3822 5.38106 1.07624 5.75738 0.884492C6.00964 0.755963 6.27178 0.708419 6.53535 0.686885C6.78506 0.666482 7.08824 0.666493 7.43967 0.666504ZM3.9987 4.66651V11.4665C3.9987 12.0376 3.99922 12.4258 4.02373 12.7258C4.04761 13.0181 4.0909 13.1676 4.14402 13.2718C4.27185 13.5227 4.47583 13.7267 4.72671 13.8545C4.83098 13.9076 4.98045 13.9509 5.27272 13.9748C5.57278 13.9993 5.96098 13.9998 6.53203 13.9998H9.46536C10.0364 13.9998 10.4246 13.9993 10.7247 13.9748C11.0169 13.9509 11.1664 13.9076 11.2707 13.8545C11.5216 13.7267 11.7255 13.5227 11.8534 13.2718C11.9065 13.1676 11.9498 13.0181 11.9737 12.7258C11.9982 12.4258 11.9987 12.0376 11.9987 11.4665V4.66651H3.9987ZM9.99865 3.33317H5.99875C5.99904 3.0231 6.00108 2.81116 6.01465 2.64506C6.02945 2.46395 6.05456 2.39681 6.07136 2.36384C6.13528 2.2384 6.23726 2.13642 6.3627 2.0725C6.39567 2.05571 6.46281 2.03059 6.64392 2.01579C6.83281 2.00036 7.081 1.99984 7.46536 1.99984H8.53203C8.9164 1.99984 9.16458 2.00036 9.35347 2.01579C9.53458 2.03059 9.60173 2.05571 9.63469 2.0725C9.76013 2.13642 9.86212 2.2384 9.92603 2.36384C9.94283 2.39681 9.96795 2.46395 9.98275 2.64506C9.99632 2.81116 9.99835 3.0231 9.99865 3.33317ZM6.66536 6.99984C7.03355 6.99984 7.33203 7.29832 7.33203 7.66651V10.9998C7.33203 11.368 7.03355 11.6665 6.66536 11.6665C6.29717 11.6665 5.9987 11.368 5.9987 10.9998V7.66651C5.9987 7.29832 6.29717 6.99984 6.66536 6.99984ZM9.33203 6.99984C9.70022 6.99984 9.9987 7.29832 9.9987 7.66651V10.9998C9.9987 11.368 9.70022 11.6665 9.33203 11.6665C8.96384 11.6665 8.66536 11.368 8.66536 10.9998V7.66651C8.66536 7.29832 8.96384 6.99984 9.33203 6.99984Z" fill="currentColor"/>
                                        </svg>
                                    </span>
                                    <p>${jsLang('Delete')}</p>
                                </a>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
    `;
           
}

//close modal
$(".content-modal-close-btn").on('click', function () {
    $(".content-folder-modal").css("display", "none");
    $("#updateFolderItemForm").trigger('reset');
    $(".folder-move-contents").html('');
});

$(".folder-search-input").on("keyup", function() {
    var value = this.value.toLowerCase().trim();
    var searchMatch = false; // Flag to check if there's a match
    var othersDivs;
    var foldersDivs;

    $(".folder-name").each(function() {
        var $parentDiv = $(this).closest('.search-folder');
        var text = $(this).text().toLowerCase().trim();
        var match = text.includes(value);
        $parentDiv.toggle(match);
        var allDivs = Array.from(document.querySelectorAll('.grid-view'));
            
        foldersDivs = allDivs.filter(div => div.getAttribute('type') === 'folder' && div.closest('.search-folder').style.display !== 'none');
        othersDivs = allDivs.filter(div => div.getAttribute('type') !== 'folder' && div.closest('.search-folder').style.display !== 'none');
                     
        if (match) {
            searchMatch = true; // Update flag if a match is found
        }
    });

    var $othersDiv = $(".others-div .files-tittle");
    var $foldersDivs = $(".parent-table .folder-tittle");

    if (othersDivs.length == 0) {
        $othersDiv.hide();
    } else {
        $othersDiv.show();
    }
    if (foldersDivs.length == 0) {
        $foldersDivs.hide();
    } else {
        $foldersDivs.show();
    }
    if (searchMatch) {
        $(".drive-table-head").show();

    } else {
        $(".drive-table-head").hide();

    }
});


function fileBookmarkToggle(element) {
    var fileId = element.getAttribute('data-file-id');
    var fileType = element.getAttribute('data-file-type');
    var beforeIsFavorite = String(element.getAttribute('data-is-favorite'));
    var afterIsFavorite = (beforeIsFavorite == "true") ? false : true;
    toggleBookmark(fileId, fileType, afterIsFavorite, element);
}

function toggleBookmark(fileId, fileType, toggleState, element) {
    $.ajax({
        url: SITE_URL + '/user/folder/toggle/bookmark',
        type: 'POST',
        dataType: "json",
        data: {
            _token: CSRF_TOKEN,
            file_id: fileId,
            toggle_state: String(toggleState),
            type: fileType
        },
        beforeSend: () => {
            $(element).html(`  
            <div class="loader-template flex items-center m-auto  rounded-lg">
                <svg class="animate-spin w-[18px] h-[18px] " xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
                    <mask id="path-1-inside-1_1032_${fileId}" fill="white">
                        <path d="M67 36C69.7614 36 72.0357 38.2493 71.6534 40.9841C70.685 47.9121 67.7119 54.4473 63.048 59.7573C57.2779 66.3265 49.3144 70.5713 40.644 71.6992C31.9736 72.8271 23.1891 70.761 15.9304 65.8866C8.67173 61.0123 3.4351 53.6628 1.19814 45.2104C-1.03881 36.7579 -0.123172 27.7803 3.77411 19.9534C7.67139 12.1266 14.2839 5.98568 22.3772 2.67706C30.4704 -0.631565 39.4912 -0.881694 47.7554 1.97337C54.4353 4.28114 60.2519 8.49021 64.5205 14.0322C66.2056 16.2199 65.3417 19.2997 62.9417 20.6656L60.8567 21.8524C58.4567 23.2183 55.4379 22.3325 53.5977 20.2735C50.9338 17.2927 47.5367 15.0161 43.7066 13.6929C38.2888 11.8211 32.3749 11.9851 27.0692 14.1542C21.7634 16.3232 17.4284 20.3491 14.8734 25.4802C12.3184 30.6113 11.7181 36.4969 13.1846 42.0381C14.6511 47.5794 18.0842 52.3975 22.8428 55.5931C27.6014 58.7886 33.3604 60.1431 39.0445 59.4037C44.7286 58.6642 49.9494 55.8814 53.7321 51.5748C56.4062 48.5302 58.2325 44.8712 59.0732 40.9628C59.6539 38.2632 61.8394 36 64.6008 36H67Z" />
                    </mask>
                    <path d="M67 36C69.7614 36 72.0357 38.2493 71.6534 40.9841C70.685 47.9121 67.7119 54.4473 63.048 59.7573C57.2779 66.3265 49.3144 70.5713 40.644 71.6992C31.9736 72.8271 23.1891 70.761 15.9304 65.8866C8.67173 61.0123 3.4351 53.6628 1.19814 45.2104C-1.03881 36.7579 -0.123172 27.7803 3.77411 19.9534C7.67139 12.1266 14.2839 5.98568 22.3772 2.67706C30.4704 -0.631565 39.4912 -0.881694 47.7554 1.97337C54.4353 4.28114 60.2519 8.49021 64.5205 14.0322C66.2056 16.2199 65.3417 19.2997 62.9417 20.6656L60.8567 21.8524C58.4567 23.2183 55.4379 22.3325 53.5977 20.2735C50.9338 17.2927 47.5367 15.0161 43.7066 13.6929C38.2888 11.8211 32.3749 11.9851 27.0692 14.1542C21.7634 16.3232 17.4284 20.3491 14.8734 25.4802C12.3184 30.6113 11.7181 36.4969 13.1846 42.0381C14.6511 47.5794 18.0842 52.3975 22.8428 55.5931C27.6014 58.7886 33.3604 60.1431 39.0445 59.4037C44.7286 58.6642 49.9494 55.8814 53.7321 51.5748C56.4062 48.5302 58.2325 44.8712 59.0732 40.9628C59.6539 38.2632 61.8394 36 64.6008 36H67Z"stroke="url(#paint0_linear_1032_${fileId})" stroke-width="24" mask="url(#path-1-inside-1_1032_${fileId})" />
                    <defs> <linearGradient id="paint0_linear_1032_${fileId}" x1="46.8123" y1="63.1382" x2="21.8195" y2="6.73779" gradientUnits="userSpaceOnUse"> <stop stop-color="#E60C84" /><stop offset="1" stop-color="#FFCF4B" /></linearGradient></defs>
                </svg>
            </div>
            `);
        },
        success: function (response) {
            if (toggleState) {
                $(element).html(`
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.75 1.75V13.5625C0.75 13.7169 0.831395 13.8599 0.964172 13.9387C1.09695 14.0175 1.26144 14.0205 1.397 13.9466L6 11.4359L10.603 13.9466C10.7386 14.0205 10.9031 14.0175 11.0358 13.9387C11.1686 13.8599 11.25 13.7169 11.25 13.5625V1.75C11.25 0.783502 10.4665 0 9.5 0H2.5C1.5335 0 0.75 0.783502 0.75 1.75Z" fill="url(#paint0_linear_11551_6160_${fileId})"/>
                        <defs>
                        <linearGradient id="paint0_linear_11551_6160_${fileId}" x1="7.5768" y1="12.2769" x2="1.83073" y2="2.55166" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#E60C84"/>
                        <stop offset="1" stop-color="#FFCF4B"/>
                        </linearGradient>
                        </defs>
                    </svg>
                `)
                $(element).closest('.folder-item').find("." + fileType + "-grid-bookmark-" + fileId).attr('data-is-favorite', 'true');
                $(element).closest('.folder-item').find("." + fileType + "-grid-bookmark-" + fileId).html(`
                    <span class="w-4 h-4">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.33464 1.3335H12.668C12.8448 1.3335 13.0143 1.40373 13.1394 1.52876C13.2644 1.65378 13.3346 1.82335 13.3346 2.00016V14.7622C13.3347 14.8218 13.3188 14.8803 13.2886 14.9317C13.2583 14.983 13.2149 15.0254 13.1627 15.0542C13.1106 15.0831 13.0516 15.0974 12.9921 15.0958C12.9325 15.0941 12.8744 15.0765 12.824 15.0448L8.0013 12.0202L3.17864 15.0442C3.12821 15.0758 3.07023 15.0934 3.0107 15.0951C2.95118 15.0968 2.89229 15.0825 2.84017 15.0537C2.78804 15.0249 2.74457 14.9827 2.71429 14.9314C2.68401 14.8802 2.66801 14.8217 2.66797 14.7622V2.00016C2.66797 1.82335 2.73821 1.65378 2.86323 1.52876C2.98826 1.40373 3.15782 1.3335 3.33464 1.3335ZM12.0013 2.66683H4.0013V12.9548L8.0013 10.4475L12.0013 12.9548V2.66683Z" fill="currentColor"/>
                        </svg>
                    </span>
                    <p>${jsLang('Undo Bookmark')}</p>
                `);

            } else {
                $(element).html(`
                
                <svg class="unmarked-behind" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.75 1.75V13.5625C0.75 13.7169 0.831395 13.8599 0.964172 13.9387C1.09695 14.0175 1.26144 14.0205 1.397 13.9466L6 11.4359L10.603 13.9466C10.7386 14.0205 10.9031 14.0175 11.0358 13.9387C11.1686 13.8599 11.25 13.7169 11.25 13.5625V1.75C11.25 0.783502 10.4665 0 9.5 0H2.5C1.5335 0 0.75 0.783502 0.75 1.75Z" fill="#898989"/>
                </svg>`)
                
                $(element).closest('.folder-item').find("." + fileType + "-grid-bookmark-" + fileId).attr('data-is-favorite', 'false');
                
                $(element).closest('.folder-item').find("." + fileType + "-grid-bookmark-" + fileId).html(`
                    <span class="w-4 h-4">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.33464 1.3335H12.668C12.8448 1.3335 13.0143 1.40373 13.1394 1.52876C13.2644 1.65378 13.3346 1.82335 13.3346 2.00016V14.7622C13.3347 14.8218 13.3188 14.8803 13.2886 14.9317C13.2583 14.983 13.2149 15.0254 13.1627 15.0542C13.1106 15.0831 13.0516 15.0974 12.9921 15.0958C12.9325 15.0941 12.8744 15.0765 12.824 15.0448L8.0013 12.0202L3.17864 15.0442C3.12821 15.0758 3.07023 15.0934 3.0107 15.0951C2.95118 15.0968 2.89229 15.0825 2.84017 15.0537C2.78804 15.0249 2.74457 14.9827 2.71429 14.9314C2.68401 14.8802 2.66801 14.8217 2.66797 14.7622V2.00016C2.66797 1.82335 2.73821 1.65378 2.86323 1.52876C2.98826 1.40373 3.15782 1.3335 3.33464 1.3335ZM12.0013 2.66683H4.0013V12.9548L8.0013 10.4475L12.0013 12.9548V2.66683Z" fill="currentColor"/>
                        </svg>
                    </span>
                    <p>${jsLang('Bookmark')}</p>
                `);
            }

            $("." + fileType + "-bookmark-" + fileId).each((index, element) => {
                let value = (toggleState) ? 'true' : 'false';
                element.setAttribute("data-is-favorite", value);

                if (toggleState) {
                    $(element).closest('.folder-item').removeClass('non-favorite').addClass('favorite');

                } else {
                    $(element).closest('.folder-item').removeClass('favorite').addClass('non-favorite');

                    if ($('#bookmark-file-filter').attr('data-text') == 'all') {
                        $(".non-favorite").hide();
                    }
                }
            });

            toastMixin.fire({
                title: response.message,
                icon: 'success'
            });
        },
        error: function (xhr, status, error) {
            toastMixin.fire({
                title: response.message,
                icon: 'error'
            });
        },
        complete: () => {
            $(".loader-template").remove();

        }
    });
}

function setBookmark(parent) {
    $('#bookmark-file-filter').attr('data-text', 'all');
    $(".non-favorite").hide();

    if ($('.container-box').children().find('favorite').length === 0) {
        $('.drive-pagination').hide();
    }
    const bookmarkId = Math.floor(Math.random() * 1000) + 1;
    $(parent).html(`<svg width="14" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.75 1.75V13.5625C0.75 13.7169 0.831395 13.8599 0.964172 13.9387C1.09695 14.0175 1.26144 14.0205 1.397 13.9466L6 11.4359L10.603 13.9466C10.7386 14.0205 10.9031 14.0175 11.0358 13.9387C11.1686 13.8599 11.25 13.7169 11.25 13.5625V1.75C11.25 0.783502 10.4665 0 9.5 0H2.5C1.5335 0 0.75 0.783502 0.75 1.75Z" fill="url(#paint0_linear_11551_${bookmarkId})"/>
                        <defs>
                        <linearGradient id="paint0_linear_11551_${bookmarkId}" x1="7.5768" y1="12.2769" x2="1.83073" y2="2.55166" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#E60C84"/>
                        <stop offset="1" stop-color="#FFCF4B"/>
                        </linearGradient>
                        </defs>
                    </svg>
                    <span class="hidden lg:block">${jsLang('Bookmarks')}</span>                `)
}

function setNotBookmark(parent) {
    $('#bookmark-file-filter').attr('data-text', 'favorite');
    $(".non-favorite").show();
    $('.drive-pagination').show();
    $(parent).html(`
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.75 1.75V13.5625C1.75 13.7169 1.83139 13.8599 1.96417 13.9387C2.09695 14.0175 2.26144 14.0205 2.397 13.9466L7 11.4359L11.603 13.9466C11.7386 14.0205 11.9031 14.0175 12.0358 13.9387C12.1686 13.8599 12.25 13.7169 12.25 13.5625V1.75C12.25 0.783502 11.4665 0 10.5 0H3.5C2.5335 0 1.75 0.783502 1.75 1.75Z" fill="#898989"/>
        </svg>                     
        <span class="hidden lg:block">${jsLang('Bookmarks')}</span>
    `);
}

$('#bookmark-file-filter').on('click', function () {
    if ($("#bookmark-file-filter").attr("data-text") == 'all') {
        setNotBookmark(this);
    } else {
        setBookmark(this);
    }
});

function downloadFolder(e) {
    var id = $(e).attr("data-id");
    doAjaxprocess(
        SITE_URL + "/user/folder/download/" + id,
        {},
        'get',
        'json'
    ).done(function(data) {

        if (data.status == 'error') {
            toastMixin.fire({
                title: data.message,
                icon: data.status,
            });
            return;
        }
        var link = document.createElement('a');
        link.href = 'data:application/octet-stream;base64,' + data.file;
        link.download = data.name + '.zip';
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);

    });
}

function downloadDocument(e) {
    var id = $(e).attr("data-id");
    var type = $(e).attr("data-type");
    var name = $(e).attr("data-name");
    doAjaxprocess(
        SITE_URL + "/user/folder/download/content",
        {
            'id': id,
            'type': type,
            _token: CSRF_TOKEN
        },
        'post',
        'json'
    ).done(function(response) {
        var header =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>" +
        "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";

        var contentOfHtml = response.data;
        var footer = "</body></html>";
        var sourceHTML = header + contentOfHtml + footer;

        var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        var fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = name + '.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
    });
}

function gridViewBookmarkToggle(element) {
    $(document).trigger('click');
    var fileId = element.getAttribute('data-file-id');
    var fileType = element.getAttribute('data-file-type');
    var beforeIsFavorite = String(element.getAttribute('data-is-favorite'));
    var afterIsFavorite = (beforeIsFavorite == "true") ? false : true;
    toggleGridViewBookmark(fileId, fileType, afterIsFavorite, element);
}

function toggleGridViewBookmark(fileId, fileType, toggleState, element) {
    $.ajax({
        url: SITE_URL + '/user/folder/toggle/bookmark',
        type: 'POST',
        dataType: "json",
        data: {
            _token: CSRF_TOKEN,
            file_id: fileId,
            toggle_state: String(toggleState),
            type: fileType
        },
        success: function (response) {
            if (!toggleState) {
                $(element).html(`
                    <span class="w-4 h-4">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.33464 1.3335H12.668C12.8448 1.3335 13.0143 1.40373 13.1394 1.52876C13.2644 1.65378 13.3346 1.82335 13.3346 2.00016V14.7622C13.3347 14.8218 13.3188 14.8803 13.2886 14.9317C13.2583 14.983 13.2149 15.0254 13.1627 15.0542C13.1106 15.0831 13.0516 15.0974 12.9921 15.0958C12.9325 15.0941 12.8744 15.0765 12.824 15.0448L8.0013 12.0202L3.17864 15.0442C3.12821 15.0758 3.07023 15.0934 3.0107 15.0951C2.95118 15.0968 2.89229 15.0825 2.84017 15.0537C2.78804 15.0249 2.74457 14.9827 2.71429 14.9314C2.68401 14.8802 2.66801 14.8217 2.66797 14.7622V2.00016C2.66797 1.82335 2.73821 1.65378 2.86323 1.52876C2.98826 1.40373 3.15782 1.3335 3.33464 1.3335ZM12.0013 2.66683H4.0013V12.9548L8.0013 10.4475L12.0013 12.9548V2.66683Z" fill="currentColor"/>
                        </svg>
                    </span>
                    <p>${jsLang('Bookmark')}</p>
                `);
                $(element).closest('.folder-item').find("." + fileType + "-bookmark-" + fileId).attr('data-is-favorite', 'false');

                $(element).closest('.folder-item').find("." + fileType + "-bookmark-" + fileId).html(`
                    <svg class="unmarked-behind" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.75 1.75V13.5625C0.75 13.7169 0.831395 13.8599 0.964172 13.9387C1.09695 14.0175 1.26144 14.0205 1.397 13.9466L6 11.4359L10.603 13.9466C10.7386 14.0205 10.9031 14.0175 11.0358 13.9387C11.1686 13.8599 11.25 13.7169 11.25 13.5625V1.75C11.25 0.783502 10.4665 0 9.5 0H2.5C1.5335 0 0.75 0.783502 0.75 1.75Z" fill="#898989"/>
                    </svg>
                `);
                
            } else {
                $(element).html(`
                    <span class="w-4 h-4">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.33464 1.3335H12.668C12.8448 1.3335 13.0143 1.40373 13.1394 1.52876C13.2644 1.65378 13.3346 1.82335 13.3346 2.00016V14.7622C13.3347 14.8218 13.3188 14.8803 13.2886 14.9317C13.2583 14.983 13.2149 15.0254 13.1627 15.0542C13.1106 15.0831 13.0516 15.0974 12.9921 15.0958C12.9325 15.0941 12.8744 15.0765 12.824 15.0448L8.0013 12.0202L3.17864 15.0442C3.12821 15.0758 3.07023 15.0934 3.0107 15.0951C2.95118 15.0968 2.89229 15.0825 2.84017 15.0537C2.78804 15.0249 2.74457 14.9827 2.71429 14.9314C2.68401 14.8802 2.66801 14.8217 2.66797 14.7622V2.00016C2.66797 1.82335 2.73821 1.65378 2.86323 1.52876C2.98826 1.40373 3.15782 1.3335 3.33464 1.3335ZM12.0013 2.66683H4.0013V12.9548L8.0013 10.4475L12.0013 12.9548V2.66683Z" fill="currentColor"/>
                        </svg>
                    </span>
                    <p>${jsLang('Undo Bookmark')}</p>
                `);

                $(element).closest('.folder-item').find("." + fileType + "-bookmark-" + fileId).attr('data-is-favorite', 'true');
                $(element).closest('.folder-item').find("." + fileType + "-bookmark-" + fileId).html(`
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.75 1.75V13.5625C0.75 13.7169 0.831395 13.8599 0.964172 13.9387C1.09695 14.0175 1.26144 14.0205 1.397 13.9466L6 11.4359L10.603 13.9466C10.7386 14.0205 10.9031 14.0175 11.0358 13.9387C11.1686 13.8599 11.25 13.7169 11.25 13.5625V1.75C11.25 0.783502 10.4665 0 9.5 0H2.5C1.5335 0 0.75 0.783502 0.75 1.75Z" fill="url(#paint0_linear_11551_6160_${fileId})"/>
                        <defs>
                        <linearGradient id="paint0_linear_11551_6160_${fileId}" x1="7.5768" y1="12.2769" x2="1.83073" y2="2.55166" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#E60C84"/>
                        <stop offset="1" stop-color="#FFCF4B"/>
                        </linearGradient>
                        </defs>
                    </svg>
                `);
            }

            $("." + fileType + "-grid-bookmark-" + fileId).each((index, element) => {
                let value = (toggleState) ? 'true' : 'false';
                element.setAttribute("data-is-favorite", value);

                if (toggleState) {
                    $(element).closest('.folder-item').removeClass('non-favorite').addClass('favorite');

                } else {
                    $(element).closest('.folder-item').removeClass('favorite').addClass('non-favorite');

                    if ($('#bookmark-file-filter').attr('data-text') == 'all') {
                        $(".non-favorite").hide();
                    }
                }
            });

            toastMixin.fire({
                title: response.message,
                icon: 'success'
            });
        },
        error: function (xhr, status, error) {
            toastMixin.fire({
                title: response.message,
                icon: 'error'
            });
        },
    });
}

$(document).on('click', '.generate-folder-modal', function(e) {
    var folder_id = $('.content-data #folder_id').val();
    $('#generateFolderOnModal .folder-show .parent-data').html(`
        <input type="int" class="hidden" name="parentId" id="parent_id" value="${folder_id}">
    `);
});

$(document).on('submit', '#generateFolderOnModal', function(e) {
    e.preventDefault();
    var gridView = $('.toggleView').prop('checked');
    $.ajax({
        url: SITE_URL+'/user/folder-create',
        type:'POST',
        data:{
            'name': $('#folder_name').val(),
            'user_id' : $('#user_id').val(),
            'parent_id': parent_id !== '' ? $('#parent_id').val() : undefined,
            '_token': CSRF_TOKEN
        },
        dataType:'JSON',
        beforeSend: () => {
            $(".folder-loader").removeClass("hidden");
        },
        success: function (response) {
            if (response.response.status == 'success') {
                let html = generateFolder(response.data);
                $('#folder-modal-view').prepend(html);

                $('#no-folder-modal').toggleClass('hidden', $('#no-folder-modal').length === 1);
                $('#folder_name').val('');
                if (response.data.parent_route) {
                    let mainDiv;
                    if (gridView) {
                        mainDiv = addGridView(response.data);
                    } else {
                        mainDiv = addListView(response.data);
                    }

                    if ($('.container-box').children().length == 1) {
                        $('.folder-tittle').removeClass("!hidden");
                    }

                    $('#documents-table-body .drive-table-head').after(mainDiv);
                    if ($('#documents-table-body').hasClass('hidden')) {
                        $('#documents-table-body').removeClass("hidden");
                        $('.no-folder').addClass("hidden");
                    }

                    gridAndListView();
                }
                
            }

            toastMixin.fire({
                title: response.response.message,
                icon: response.response.status == 'fail' ? 'error' : response.response.status,
            });
        },
        complete: () => {
            $(".folder-loader").addClass("hidden");
            $('#generateFolderOnModal').addClass('hidden')
            $('#updateFolderItemForm').removeClass('hidden')
        },
        error: function(data) {
            var jsonData = JSON.parse(data.responseText);
            var message = jsonData.message;

            toastMixin.fire({
                title: message,
                icon: 'error',
            });
        }
    })
});

function generateFolder(data) {
    return `
    <a href="javascript:void(0)" class="flex justify-start items-center gap-2.5 text-15 font-medium text-color-14 dark:text-white font-Figtree px-7 py-[9px] hover:bg-color-F6 dark:hover:bg-[#3A3A39] text-left"
        data-folder-id="${data.id}" data-parent-id="${data.parent_id}" onclick="fetchFolderData(this)">
        <span class="w-[18px] h-[18px] text-color-47 dark:text-white">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.0552 3.375H15.535C15.8476 3.37497 16.1569 3.4401 16.443 3.56624C16.729 3.69238 16.9857 3.87676 17.1966 4.10762C17.4074 4.33848 17.5678 4.61076 17.6676 4.90707C17.7674 5.20339 17.8043 5.51725 17.776 5.82863L17.0594 13.7036C17.0086 14.2627 16.7506 14.7825 16.3362 15.1611C15.9218 15.5397 15.3808 15.7498 14.8195 15.75H3.17685C2.61552 15.7498 2.07455 15.5397 1.66013 15.1611C1.24571 14.7825 0.98778 14.2627 0.93698 13.7036L0.220355 5.82863C0.172414 5.30751 0.308548 4.78606 0.605105 4.35488L0.56123 3.375C0.56123 2.77826 0.798283 2.20597 1.22024 1.78401C1.6422 1.36205 2.21449 1.125 2.81123 1.125H6.94223C7.53892 1.12513 8.11112 1.36226 8.53298 1.78425L9.46448 2.71575C9.88634 3.13774 10.4585 3.37487 11.0552 3.375ZM1.69298 3.51C1.93373 3.42225 2.19248 3.375 2.46248 3.375H8.53298L7.73761 2.57963C7.52668 2.36863 7.24057 2.25006 6.94223 2.25H2.81123C2.51653 2.24995 2.23357 2.36553 2.0232 2.57191C1.81282 2.77829 1.69183 3.05898 1.68623 3.35362L1.69298 3.51Z" fill="currentColor"/>
            </svg>
        </span>
        <p>${data.name}</p>
    </a>
    `;     
}

let collectIds = [];

$(document).ready(function () {
    
    let selectedCountDisplay = document.getElementById('selectedCount');
    let selectedCount = 0;

    $(document).on('click', '.view-box', function(e) {
        let div = $(this);
        let isSelected = div.attr('data-selected') === 'true';
    
        if (e.ctrlKey || e.metaKey) {
            if (isSelected) {
                div.removeAttr('data-selected');
                if (div.find('a').length) {
                    div.find('a').removeAttr('disabled');
                }
                div.removeClass('!bg-[#D6C5EB] dark:!bg-[#504163] border');
                selectedCount--;
                collectIds.splice(collectIds.indexOf(div.attr('id')), 1);
            } else {
                div.attr('data-selected', 'true');
                if (div.find('a').length) {
                    div.find('a').attr('disabled', 'true');
                }
                div.addClass('!bg-[#D6C5EB] dark:!bg-[#504163]');
                selectedCount++;
                collectIds.push(div.attr('id'));
            }
        } else {
            clearAllSelections();
            div.attr('data-selected', 'true');
            if (div.find('a').length) {
                div.find('a').attr('disabled', 'true');
            }
            div.addClass('!bg-[#D6C5EB] dark:!bg-[#504163]');
            selectedCount = 1;
            collectIds = [div.attr('id')];
        }
        updateSelectedCountDisplay();
        updateSelectAllCheckbox();
    });
    
    $(document).on('dblclick', '.view-box', function(e) {
        let link = findLinkInElement($(this));
        if (link) {
            window.location = link.attr('href');
        }
    });
    
    function findLinkInElement(element) {
        if (element.tagName === 'A') {
            return element;
        } else {
            let anchorElement = element.find('a');
            if (anchorElement) {
                return anchorElement;
            }
            // If no direct 'a' tag found, check recursively in child elements
            for (let i = 0; i < element.children.length; i++) {
                let childLink = findLinkInElement(element.children[i]);
                if (childLink) {
                    return childLink;
                }
            }
        }
        return null;
    }

    function clearAllSelections() {
        let selectedDivs = document.querySelectorAll('.view-box[data-selected="true"]');
        selectedDivs.forEach(selected => {
            selected.removeAttribute('data-selected');
            if (selected.querySelector('a')) {
                selected.querySelector('a').removeAttribute('disabled');
            }
            selected.classList.remove('!bg-[#D6C5EB]', 'dark:!bg-[#504163]', 'border');
        });
    }

    function updateSelectAllCheckbox() {
        let divs = document.querySelectorAll('.view-box');
        let selectAllCheckbox = document.getElementById('selectAllCheckbox');

        let allSelected = Array.from(divs).every(div => div.getAttribute('data-selected') === 'true');

        if (allSelected) {
            selectedCount = divs.length;
            selectedCountDisplay.textContent = 'All files selected';
        } else {
            selectedCount = document.querySelectorAll('.view-box[data-selected="true"]').length;
            updateSelectedCountDisplay();
        }
    }

    function updateSelectedCountDisplay() {
        let sopBoxes = document.querySelectorAll('.sopbox');
        if (selectedCount > 0) {
            sopBoxes.forEach(box => {
                box.classList.remove('hidden');
            });

            selectedCountDisplay.textContent = selectedCount + ' selected:';
        } else {
            sopBoxes.forEach(box => {
                box.classList.add('hidden');
            });
            selectedCountDisplay.textContent = '';
        }
    }

    function clearSelection() {
        $('.sopbox').addClass('hidden');
        $('#selectedCount').empty();
    }


    $(document).on('click', '.delete-folder', function () {
        var id = collectIds;
        var itemType = $(this).attr("data-type") ?? "";

        $.ajax({
            url: SITE_URL + "/user/folder/delete",
            type:'post',
            data:{
                id : id,
                type : itemType,
                _token: CSRF_TOKEN
            },
            dataType:'JSON',
            beforeSend: () => {
                $(".folder-del-loader").removeClass("hidden");
            },
            success: function (data) {
                collectIds.forEach(function(item) {
                    $('#' + item).remove();
                });
                clearSelection();
                toastMixin.fire({
                    title: data.message,
                    icon: data.status,
                });
                $('.close-popup').trigger('click');
                gridAndListView();
    
                if ($('.container-box').children().length <= 1 && $('.others-div').children().length <= 1) {
                    $('#documents-table-body').addClass("hidden");
                    $('.folder-tittle').addClass("!hidden");
                    $('.no-folder').removeClass("hidden");
                } else {

                    if ($('.container-box').children().length <= 1) {
                        $('.folder-tittle').addClass("!hidden");
                    }
    
                    if ($('.others-div').children().length <= 1) {
                        $('.files-tittle').addClass("hidden");
                    }

                }
            },
            complete: () => {
                $(".folder-del-loader").addClass("hidden");
            },
            error: function (data) {
                var jsonData = JSON.parse(data.responseText);
                var message = jsonData.message;
    
                toastMixin.fire({
                    title: message,
                    icon: 'error',
                });
            }
        })
    });

    // Move Folder
    $(document).on('click', "#drive-modal", function (e) {

        $(".move-data").html(`
            <nav class="flex my-4 px-5">
                <ol class="inline-flex items-center space-x-2">
                <li class="inline-flex items-center">
                    <a href="javascript:void(0)" class="inline-flex gap-2 items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.59851 2.625H12.0828C12.3259 2.62497 12.5665 2.67563 12.789 2.77374C13.0115 2.87185 13.2111 3.01526 13.3751 3.19482C13.5391 3.37438 13.6639 3.58614 13.7415 3.81661C13.8191 4.04708 13.8478 4.29119 13.8258 4.53338L13.2684 10.6584C13.2289 11.0932 13.0283 11.4975 12.7059 11.792C12.3836 12.0865 11.9629 12.2498 11.5263 12.25H2.47089C2.0343 12.2498 1.61354 12.0865 1.29121 11.792C0.968884 11.4975 0.768274 11.0932 0.728762 10.6584L0.171387 4.53338C0.1341 4.12806 0.239982 3.72249 0.470637 3.38713L0.436512 2.625C0.436512 2.16087 0.620886 1.71575 0.949075 1.38756C1.27726 1.05937 1.72238 0.875 2.18651 0.875H5.39951C5.8636 0.875099 6.30865 1.05954 6.63676 1.38775L7.36126 2.11225C7.68937 2.44046 8.13442 2.6249 8.59851 2.625ZM1.31676 2.73C1.50401 2.66175 1.70526 2.625 1.91526 2.625H6.63676L6.01814 2.00637C5.85408 1.84227 5.63156 1.75005 5.39951 1.75H2.18651C1.9573 1.74996 1.73722 1.83986 1.5736 2.00038C1.40997 2.16089 1.31587 2.3792 1.31151 2.60837L1.31676 2.73Z" fill="#898989"></path>
                        </svg>

                        <span class="text-color-47 dark:text-white text-15 font-Figtree font-normal">${jsLang('Drive')}</span>
                    </a>
                </li>
                </ol>
            </nav>
        `);
        var itemId = $(this).data('id');
        var title = $(this).data('content');
        var parentFolderId = $(this).data('parent-id');
        if (title.length > 35) {
            title = title.substring(0, 35) + '...';
        }

        $('.move-content-title').text(jsLang('Move') + ' ' + '"' + title + '"');

        $.ajax({
            url: SITE_URL + '/user/fetch/all-folder',
            type:'get',
            dataType:'JSON',
            data:{
                'id': itemId,
                'parentId': parentFolderId,
                '_token': CSRF_TOKEN
            },
            beforeSend: () => {
                $('.move-data div:eq(1)').remove();
                $(".content-folder-loader").removeClass("hidden");
            },
            success: function (response) {
                $(".move-data").html(response.html);
                $('.content-data').html(`
                    <input type="hidden" name="folderId" id="folder_id" value="${response.folder_id}">
                    <input type="hidden" name="parentFolderId" id="parent_folder_id" value="${parentFolderId}">
                `); 
                if (response.button_disabled) {
                    $(".move-data-content").prop('disabled', true);
                } 
            },
            complete: () => {
                $(".content-folder-loader").addClass("hidden");
            },
        })

    });

    $(document).on('click', "#multiple-drive-modal", function (e) {

        $('.move-content-title').text(jsLang('Move') + ' ' + '"' + selectedCount + ' items"');

        $(".move-data").html(`
            <nav class="flex my-4 px-5">
                <ol class="inline-flex items-center space-x-2">
                <li class="inline-flex items-center">
                    <a href="javascript:void(0)" class="inline-flex gap-2 items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.59851 2.625H12.0828C12.3259 2.62497 12.5665 2.67563 12.789 2.77374C13.0115 2.87185 13.2111 3.01526 13.3751 3.19482C13.5391 3.37438 13.6639 3.58614 13.7415 3.81661C13.8191 4.04708 13.8478 4.29119 13.8258 4.53338L13.2684 10.6584C13.2289 11.0932 13.0283 11.4975 12.7059 11.792C12.3836 12.0865 11.9629 12.2498 11.5263 12.25H2.47089C2.0343 12.2498 1.61354 12.0865 1.29121 11.792C0.968884 11.4975 0.768274 11.0932 0.728762 10.6584L0.171387 4.53338C0.1341 4.12806 0.239982 3.72249 0.470637 3.38713L0.436512 2.625C0.436512 2.16087 0.620886 1.71575 0.949075 1.38756C1.27726 1.05937 1.72238 0.875 2.18651 0.875H5.39951C5.8636 0.875099 6.30865 1.05954 6.63676 1.38775L7.36126 2.11225C7.68937 2.44046 8.13442 2.6249 8.59851 2.625ZM1.31676 2.73C1.50401 2.66175 1.70526 2.625 1.91526 2.625H6.63676L6.01814 2.00637C5.85408 1.84227 5.63156 1.75005 5.39951 1.75H2.18651C1.9573 1.74996 1.73722 1.83986 1.5736 2.00038C1.40997 2.16089 1.31587 2.3792 1.31151 2.60837L1.31676 2.73Z" fill="#898989"></path>
                        </svg>

                        <span class="text-color-47 dark:text-white text-15 font-Figtree font-normal">${jsLang('Drive')}</span>
                    </a>
                </li>
                </ol>
            </nav>
        `);
        var parentFolderId = $(this).data('parent-id');
        $.ajax({
            url: SITE_URL + '/user/fetch/all-folder',
            type:'get',
            dataType:'JSON',
            data:{
                'id': '',
                'items' : collectIds,
                'parentId': parentFolderId,
                '_token': CSRF_TOKEN
            },
            beforeSend: () => {
                $('.move-data div:eq(1)').remove();
                $(".content-folder-loader").removeClass("hidden");
                $(".move-data-content").prop('disabled', true);
            },
            success: function (response) {
                const responseHTML = response.html;
                const tempElement = document.createElement('div');
                tempElement.innerHTML = responseHTML;

                const folderModalView = tempElement.querySelector('#folder-modal-view');
                const folderModalViews = tempElement.querySelectorAll('#folder-modal-view [data-folder-id]');

                if (!response.button_disabled) {
                    $(".move-data-content").prop('disabled', false);
                } 

                if (folderModalViews.length === 0 && folderModalView) {
                    const noFolderModalHTML = `
                        <div class="flex justify-start items-center gap-2.5 text-15 font-medium text-color-14 dark:text-white font-Figtree px-7 py-[9px] text-left" id="no-folder-modal">
                            <span class="w-[18px] h-[18px] text-color-DF dark:text-color-47">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.0552 3.375H15.535C15.8476 3.37497 16.1569 3.4401 16.443 3.56624C16.729 3.69238 16.9857 3.87676 17.1966 4.10762C17.4074 4.33848 17.5678 4.61076 17.6676 4.90707C17.7674 5.20339 17.8043 5.51725 17.776 5.82863L17.0594 13.7036C17.0086 14.2627 16.7506 14.7825 16.3362 15.1611C15.9218 15.5397 15.3808 15.7498 14.8195 15.75H3.17685C2.61552 15.7498 2.07455 15.5397 1.66013 15.1611C1.24571 14.7825 0.98778 14.2627 0.93698 13.7036L0.220355 5.82863C0.172414 5.30751 0.308548 4.78606 0.605105 4.35488L0.56123 3.375C0.56123 2.77826 0.798283 2.20597 1.22024 1.78401C1.6422 1.36205 2.21449 1.125 2.81123 1.125H6.94223C7.53892 1.12513 8.11112 1.36226 8.53298 1.78425L9.46448 2.71575C9.88634 3.13774 10.4585 3.37487 11.0552 3.375ZM1.69298 3.51C1.93373 3.42225 2.19248 3.375 2.46248 3.375H8.53298L7.73761 2.57963C7.52668 2.36863 7.24057 2.25006 6.94223 2.25H2.81123C2.51653 2.24995 2.23357 2.36553 2.0232 2.57191C1.81282 2.77829 1.69183 3.05898 1.68623 3.35362L1.69298 3.51Z" fill="currentColor"/>
                                </svg>
                            </span>
                            <p>${jsLang('No folders')}</p>
                        </div>
                    `;

                    folderModalView.innerHTML = noFolderModalHTML;
                }
                
                $(".move-data").html(tempElement.innerHTML);
                
                $('.content-data').html(`
                    <input type="hidden" name="folderId" id="folder_id" value="${response.folder_id}">
                    <input type="hidden" name="parentFolderId" id="parent_folder_id" value="${parentFolderId}">
                `);
            },
            complete: () => {
                $(".content-folder-loader").addClass("hidden");
            },
        })

    });

    $(document).on('submit', '#updateFolderItemForm', function(e) {
        e.preventDefault();
        var items = collectIds;
        var folderId = $('#folder_id').val();

        $.ajax({
            url: SITE_URL + '/user/folder/move',
            type:'POST',
            data:{
                'folder_id': folderId,
                'parent_folder_id': $('#parent_folder_id').val(),
                'items': items,
                '_token': CSRF_TOKEN
            },
            dataType:'JSON',
            beforeSend: () => {
                $(".drive-content-loader").removeClass("hidden");
            },
            success: function (response) {
                if (response.status == 'success') {
                    $("#updateFolderItemForm").trigger('reset');
                    items.forEach(function(item) {
                        $('#' + item).remove();
                    });
                    
                    var folder = $('#folder-' + folderId);
                   
                    if (folder) {
                        var folderCount = folder.find('.folder-count').text();
                        folderCount = parseInt(folderCount) + items.length;
                        folder.find('.folder-count').text(folderCount);
                        clearSelection();
                    }
                    
                    $('.close-popup').trigger('click');
                }
    
                toastMixin.fire({
                    title: response.message,
                    icon: response.status == 'fail' ? 'error' : response.status,
                });
    
            },
            complete: () => {
                $(".drive-content-loader").addClass("hidden");
            },
        })
    });
});

function fetchFolderData(e) {
    var id = $(e).attr('data-folder-id');
    var parentId = $(e).attr('data-parent-id');
    var moveDataId = $('#updateFolderItemForm input[name="parentFolderId"]').val();

    $.ajax({
        url: SITE_URL + '/user/fetch-folder',
        type:'get',
        data:{
            'id': id,
            'parentId': parentId,
            'moveDataId': moveDataId,
            'items' : collectIds,
            '_token': CSRF_TOKEN
        },
        dataType:'JSON',
        beforeSend: () => {
            $(".drive-content-loader").removeClass("hidden");
            $(".move-data-content").prop('disabled', false);
        },
        success: function (response) {
            $(".move-data").html(response.html);
            $("#folder_id").val(id);
            if (response.button_disabled) {
                $(".move-data-content").prop('disabled', true);
            }
        },
        complete: () => {
            $(".drive-content-loader").addClass("hidden");
        },
    })
}

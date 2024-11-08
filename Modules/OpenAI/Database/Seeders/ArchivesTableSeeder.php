<?php

namespace Modules\OpenAI\Database\Seeders;

use Illuminate\Database\Seeder;

class ArchivesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('archives')->delete();
        
        \DB::table('archives')->insert(array (
            0 => 
            array (
                'id' => 16,
                'parent_id' => NULL,
                'user_id' => NULL,
                'title' => 'is menu builder available on martvill?',
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => NULL,
                'unique_identifier' => '71ba9723-e6fc-4c7d-82de-254f22c51838',
                'provider' => 'openai',
                'expense' => NULL,
                'expense_type' => NULL,
                'type' => 'chatbot_chat',
                'status' => 'Active',
                'created_at' => offsetDate(-3),
            ),
            1 => 
            array (
                'id' => 17,
                'parent_id' => 16,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => NULL,
                'unique_identifier' => '',
                'provider' => NULL,
                'expense' => NULL,
                'expense_type' => NULL,
                'type' => 'visitor_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-3),
            ),
            2 => 
            array (
                'id' => 18,
                'parent_id' => 16,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => '{"content":"Yes, Martvill includes a powerful Menu Builder feature that allows businesses to create and customize navigation menus for their e-commerce website. This feature offers flexibility in organizing website content, improving navigation, and enhancing the user experience for customers.","response":{"id":"chatcmpl-AI8t9urVeOZy5bubyF2WjRajF3ZtX","object":"chat.completion","created":1728887435,"model":"gpt-4o-mini-2024-07-18","choices":[{"index":0,"message":{"role":"assistant","content":"Yes, Martvill includes a powerful Menu Builder feature that allows businesses to create and customize navigation menus for their e-commerce website. This feature offers flexibility in organizing website content, improving navigation, and enhancing the user experience for customers.","functionCall":null},"finishReason":"stop"}],"usage":{"promptTokens":3977,"completionTokens":45,"totalTokens":4022}},"expense":4022,"word":38}',
                'unique_identifier' => '',
                'provider' => 'openai',
                'expense' => 4022.0,
                'expense_type' => 'token',
                'type' => 'chatbot_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-3),
            ),
            3 => 
            array (
                'id' => 19,
                'parent_id' => 16,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => NULL,
                'unique_identifier' => '',
                'provider' => NULL,
                'expense' => NULL,
                'expense_type' => NULL,
                'type' => 'visitor_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-4),
            ),
            4 => 
            array (
                'id' => 20,
                'parent_id' => 16,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => '{"content":"Martvill supports a wide range of product types, providing businesses with the flexibility to showcase and sell different types of products within their online store. These include simple physical products, grouped items, virtual goods, downloadable content, external\\/affiliate products, and products with variations. This versatility caters to diverse business needs.","response":{"id":"chatcmpl-AI8u1wDu6E8fdHSXvZe94dwg5wwX4","object":"chat.completion","created":1728887489,"model":"gpt-4o-mini-2024-07-18","choices":[{"index":0,"message":{"role":"assistant","content":"Martvill supports a wide range of product types, providing businesses with the flexibility to showcase and sell different types of products within their online store. These include simple physical products, grouped items, virtual goods, downloadable content, external\\/affiliate products, and products with variations. This versatility caters to diverse business needs.","functionCall":null},"finishReason":"stop"}],"usage":{"promptTokens":3978,"completionTokens":61,"totalTokens":4039}},"expense":4039,"word":50}',
                'unique_identifier' => '',
                'provider' => 'openai',
                'expense' => 4039.0,
                'expense_type' => 'token',
                'type' => 'chatbot_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-4),
            ),
            5 => 
            array (
                'id' => 21,
                'parent_id' => 16,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => NULL,
                'unique_identifier' => '',
                'provider' => NULL,
                'expense' => NULL,
                'expense_type' => NULL,
                'type' => 'visitor_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-4),
            ),
            6 => 
            array (
                'id' => 22,
                'parent_id' => 16,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => '{"content":"Multiple Shipping Methods in Martvill allows businesses to offer various shipping options to customers during the checkout process. This feature includes choices such as flat-rate shipping, free shipping, and local pickup options. By providing multiple shipping methods, businesses can cater to different customer preferences and offer convenient and cost-effective shipping choices, enhancing the overall shopping experience.","response":{"id":"chatcmpl-AI8ukdD44x45GjM1qLvz4ozY3zxMI","object":"chat.completion","created":1728887534,"model":"gpt-4o-mini-2024-07-18","choices":[{"index":0,"message":{"role":"assistant","content":"Multiple Shipping Methods in Martvill allows businesses to offer various shipping options to customers during the checkout process. This feature includes choices such as flat-rate shipping, free shipping, and local pickup options. By providing multiple shipping methods, businesses can cater to different customer preferences and offer convenient and cost-effective shipping choices, enhancing the overall shopping experience.","functionCall":null},"finishReason":"stop"}],"usage":{"promptTokens":3975,"completionTokens":66,"totalTokens":4041}},"expense":4041,"word":56}',
                'unique_identifier' => '',
                'provider' => 'openai',
                'expense' => 4041.0,
                'expense_type' => 'token',
                'type' => 'chatbot_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-5),
            ),
            7 => 
            array (
                'id' => 23,
                'parent_id' => NULL,
                'user_id' => NULL,
                'title' => 'How to controll tax?',
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => NULL,
                'unique_identifier' => '296a0ce4-0f6d-44fe-977b-5614549e99a1',
                'provider' => 'openai',
                'expense' => NULL,
                'expense_type' => NULL,
                'type' => 'chatbot_chat',
                'status' => 'Active',
                'created_at' => offsetDate(-5),
            ),
            8 => 
            array (
                'id' => 24,
                'parent_id' => 23,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => NULL,
                'unique_identifier' => '',
                'provider' => NULL,
                'expense' => NULL,
                'expense_type' => NULL,
                'type' => 'visitor_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-5),
            ),
            9 => 
            array (
                'id' => 25,
                'parent_id' => 23,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => '{"content":"Martvill provides robust tax management capabilities that allow businesses to have control over their taxes and ensure compliance with tax regulations. This feature enables businesses to configure and manage tax settings, apply taxes accurately to products, and generate comprehensive tax reports for financial and compliance purposes. By using these tools, businesses can effectively manage their tax obligations and maintain accurate records.","response":{"id":"chatcmpl-AI8vxKX4jSkUOL8zb01IvfwUaTOY1","object":"chat.completion","created":1728887609,"model":"gpt-4o-mini-2024-07-18","choices":[{"index":0,"message":{"role":"assistant","content":"Martvill provides robust tax management capabilities that allow businesses to have control over their taxes and ensure compliance with tax regulations. This feature enables businesses to configure and manage tax settings, apply taxes accurately to products, and generate comprehensive tax reports for financial and compliance purposes. By using these tools, businesses can effectively manage their tax obligations and maintain accurate records.","functionCall":null},"finishReason":"stop"}],"usage":{"promptTokens":3974,"completionTokens":68,"totalTokens":4042}},"expense":4042,"word":61}',
                'unique_identifier' => '',
                'provider' => 'openai',
                'expense' => 4042.0,
                'expense_type' => 'token',
                'type' => 'chatbot_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-5),
            ),
            10 => 
            array (
                'id' => 26,
                'parent_id' => 23,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => NULL,
                'unique_identifier' => '',
                'provider' => NULL,
                'expense' => NULL,
                'expense_type' => NULL,
                'type' => 'visitor_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-5),
            ),
            11 => 
            array (
                'id' => 27,
                'parent_id' => 23,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => '{"content":"Yes, Martvill offers a simplified coupon system that allows businesses to easily create and manage coupon codes. This feature helps attract customers, boost sales, and run promotional campaigns effectively.","response":{"id":"chatcmpl-AI8wOc1uGWT0HBf4CHcEycEl90wV6","object":"chat.completion","created":1728887636,"model":"gpt-4o-mini-2024-07-18","choices":[{"index":0,"message":{"role":"assistant","content":"Yes, Martvill offers a simplified coupon system that allows businesses to easily create and manage coupon codes. This feature helps attract customers, boost sales, and run promotional campaigns effectively.","functionCall":null},"finishReason":"stop"}],"usage":{"promptTokens":3973,"completionTokens":35,"totalTokens":4008}},"expense":4008,"word":29}',
                'unique_identifier' => '',
                'provider' => 'openai',
                'expense' => 4008.0,
                'expense_type' => 'token',
                'type' => 'chatbot_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-6),
            ),
            12 => 
            array (
                'id' => 28,
                'parent_id' => 23,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => NULL,
                'unique_identifier' => '',
                'provider' => NULL,
                'expense' => NULL,
                'expense_type' => NULL,
                'type' => 'visitor_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-6),
            ),
            13 => 
            array (
                'id' => 29,
                'parent_id' => 23,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => '{"content":"Martvill offers a seamless and efficient refund process designed to facilitate customer satisfaction and maintain a positive shopping experience. The refund feature allows businesses to handle refund requests, process returns, and provide timely reimbursements to customers. This ensures a fair and customer-centric approach to managing product returns. If customers have any specific questions regarding the refund policy or process, they should refer to the business\\u2019s individual refund policy or contact customer support for assistance.","response":{"id":"chatcmpl-AI8xDfbGouUvsxGqQ6GPfsGR0UW0i","object":"chat.completion","created":1728887687,"model":"gpt-4o-mini-2024-07-18","choices":[{"index":0,"message":{"role":"assistant","content":"Martvill offers a seamless and efficient refund process designed to facilitate customer satisfaction and maintain a positive shopping experience. The refund feature allows businesses to handle refund requests, process returns, and provide timely reimbursements to customers. This ensures a fair and customer-centric approach to managing product returns. If customers have any specific questions regarding the refund policy or process, they should refer to the business\\u2019s individual refund policy or contact customer support for assistance.","functionCall":null},"finishReason":"stop"}],"usage":{"promptTokens":3973,"completionTokens":85,"totalTokens":4058}},"expense":4058,"word":75}',
                'unique_identifier' => '',
                'provider' => 'openai',
                'expense' => 4058.0,
                'expense_type' => 'token',
                'type' => 'chatbot_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-6),
            ),
            14 => 
            array (
                'id' => 46,
                'parent_id' => NULL,
                'user_id' => NULL,
                'title' => 'When i have to contact a hosting provider?',
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => NULL,
                'unique_identifier' => '8da8e865-bcbf-46fd-86d7-43ae730e117e',
                'provider' => 'openai',
                'expense' => NULL,
                'expense_type' => NULL,
                'type' => 'chatbot_chat',
                'status' => 'Active',
                'created_at' => offsetDate(-6),
            ),
            15 => 
            array (
                'id' => 47,
                'parent_id' => 46,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => NULL,
                'unique_identifier' => '',
                'provider' => NULL,
                'expense' => NULL,
                'expense_type' => NULL,
                'type' => 'visitor_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-6),
            ),
            16 => 
            array (
                'id' => 48,
                'parent_id' => 46,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => '{"content":"You should contact your hosting provider in several situations, including:\\n\\n1. **Website Downtime**: If your website is not accessible or experiencing outages.\\n2. **Technical Issues**: If you\'re facing problems with your website\'s performance, such as slow loading times or error messages.\\n3. **Billing Questions**: If you have inquiries or issues related to your billing or account status.\\n4. **Domain Issues**: If you\'re having trouble with domain registration, transfers, or DNS settings.\\n5. **Security Concerns**: If you suspect your website has been hacked or compromised.\\n6. **Upgrades or Changes**: If you need to upgrade your hosting plan or change your server settings.\\n7. **Email Problems**: If you\'re experiencing issues with your email hosting services.\\n\\nIt\'s always best to reach out to your hosting provider whenever you have questions or concerns regarding your website or hosting services.","response":{"id":"chatcmpl-AI9B6gIsLo45nTOtSnOaDJmucjd6O","object":"chat.completion","created":1728888548,"model":"gpt-4o-mini-2024-07-18","choices":[{"index":0,"message":{"role":"assistant","content":"You should contact your hosting provider in several situations, including:\\n\\n1. **Website Downtime**: If your website is not accessible or experiencing outages.\\n2. **Technical Issues**: If you\'re facing problems with your website\'s performance, such as slow loading times or error messages.\\n3. **Billing Questions**: If you have inquiries or issues related to your billing or account status.\\n4. **Domain Issues**: If you\'re having trouble with domain registration, transfers, or DNS settings.\\n5. **Security Concerns**: If you suspect your website has been hacked or compromised.\\n6. **Upgrades or Changes**: If you need to upgrade your hosting plan or change your server settings.\\n7. **Email Problems**: If you\'re experiencing issues with your email hosting services.\\n\\nIt\'s always best to reach out to your hosting provider whenever you have questions or concerns regarding your website or hosting services.","functionCall":null},"finishReason":"stop"}],"usage":{"promptTokens":69,"completionTokens":180,"totalTokens":249}},"expense":249,"word":128}',
                'unique_identifier' => '',
                'provider' => 'openai',
                'expense' => 249.0,
                'expense_type' => 'token',
                'type' => 'chatbot_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-6),
            ),
            17 => 
            array (
                'id' => 49,
                'parent_id' => NULL,
                'user_id' => NULL,
                'title' => 'Is inventory management available?',
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => NULL,
                'unique_identifier' => '4a2f0c20-0c1b-41c1-ad01-b06e4fa5391b',
                'provider' => 'openai',
                'expense' => NULL,
                'expense_type' => NULL,
                'type' => 'chatbot_chat',
                'status' => 'Active',
                'created_at' => offsetDate(-6),
            ),
            18 => 
            array (
                'id' => 50,
                'parent_id' => 49,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => NULL,
                'unique_identifier' => '',
                'provider' => NULL,
                'expense' => NULL,
                'expense_type' => NULL,
                'type' => 'visitor_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-7),
            ),
            19 => 
            array (
                'id' => 51,
                'parent_id' => 49,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => '{"content":"Yes, Martvill provides robust inventory management capabilities, allowing businesses to efficiently track, monitor, and manage their product inventory within the e-commerce platform. This feature helps maintain accurate stock levels, streamline fulfillment processes, and avoid stock-outs or overselling, ensuring a seamless shopping experience for customers.","response":{"id":"chatcmpl-AI9K6X2CCJgle9lwvvL4rI0bC9Pta","object":"chat.completion","created":1728889106,"model":"gpt-4o-mini-2024-07-18","choices":[{"index":0,"message":{"role":"assistant","content":"Yes, Martvill provides robust inventory management capabilities, allowing businesses to efficiently track, monitor, and manage their product inventory within the e-commerce platform. This feature helps maintain accurate stock levels, streamline fulfillment processes, and avoid stock-outs or overselling, ensuring a seamless shopping experience for customers.","functionCall":null},"finishReason":"stop"}],"usage":{"promptTokens":3974,"completionTokens":57,"totalTokens":4031}},"expense":4031,"word":44}',
                'unique_identifier' => '',
                'provider' => 'openai',
                'expense' => 4031.0,
                'expense_type' => 'token',
                'type' => 'chatbot_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-7),
            ),
            20 => 
            array (
                'id' => 52,
                'parent_id' => 49,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => NULL,
                'unique_identifier' => '',
                'provider' => NULL,
                'expense' => NULL,
                'expense_type' => NULL,
                'type' => 'visitor_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-7),
            ),
            21 => 
            array (
                'id' => 53,
                'parent_id' => 49,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => '{"content":"Yes, Martvill offers businesses the flexibility to set up and manage shipping destinations. This allows them to define and customize shipping options for various regions and countries, catering to a diverse customer base.","response":{"id":"chatcmpl-AI9L8qrpq5Zy7Lq9kGaUqIRLltpqg","object":"chat.completion","created":1728889170,"model":"gpt-4o-mini-2024-07-18","choices":[{"index":0,"message":{"role":"assistant","content":"Yes, Martvill offers businesses the flexibility to set up and manage shipping destinations. This allows them to define and customize shipping options for various regions and countries, catering to a diverse customer base.","functionCall":null},"finishReason":"stop"}],"usage":{"promptTokens":3976,"completionTokens":38,"totalTokens":4014}},"expense":4014,"word":33}',
                'unique_identifier' => '',
                'provider' => 'openai',
                'expense' => 4014.0,
                'expense_type' => 'token',
                'type' => 'chatbot_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-7),
            ),
            22 => 
            array (
                'id' => 54,
                'parent_id' => 49,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => NULL,
                'unique_identifier' => '',
                'provider' => NULL,
                'expense' => NULL,
                'expense_type' => NULL,
                'type' => 'visitor_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-7),
            ),
            23 => 
            array (
                'id' => 55,
                'parent_id' => 49,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => '{"content":"Martvill offers multiple shipping methods to cater to different customer preferences, including flat-rate shipping, free shipping, and local pickup options. This flexibility allows businesses to provide convenient and cost-effective shipping choices during the checkout process.","response":{"id":"chatcmpl-AI9LkcKvwT8ReBPEBchj6912f9L17","object":"chat.completion","created":1728889208,"model":"gpt-4o-mini-2024-07-18","choices":[{"index":0,"message":{"role":"assistant","content":"Martvill offers multiple shipping methods to cater to different customer preferences, including flat-rate shipping, free shipping, and local pickup options. This flexibility allows businesses to provide convenient and cost-effective shipping choices during the checkout process.","functionCall":null},"finishReason":"stop"}],"usage":{"promptTokens":3974,"completionTokens":43,"totalTokens":4017}},"expense":4017,"word":35}',
                'unique_identifier' => '',
                'provider' => 'openai',
                'expense' => 4017.0,
                'expense_type' => 'token',
                'type' => 'chatbot_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-7),
            ),
            24 => 
            array (
                'id' => 56,
                'parent_id' => 49,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => NULL,
                'unique_identifier' => '',
                'provider' => NULL,
                'expense' => NULL,
                'expense_type' => NULL,
                'type' => 'visitor_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-7),
            ),
            25 => 
            array (
                'id' => 57,
                'parent_id' => 49,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => '{"content":"If shipping zones are multiple, Martvill allows businesses to create and manage these distinct shipping options and rates based on geographical regions. This feature enables businesses to customize shipping methods, prices, and delivery options for different zones, optimizing the shipping experience for customers according to their specific locations. By defining multiple shipping zones, businesses can cater to a diverse customer base and ensure accurate shipping costs are applied.","response":{"id":"chatcmpl-AI9MBQ4sDq5P0SONhDyXO8ZNbsXKe","object":"chat.completion","created":1728889235,"model":"gpt-4o-mini-2024-07-18","choices":[{"index":0,"message":{"role":"assistant","content":"If shipping zones are multiple, Martvill allows businesses to create and manage these distinct shipping options and rates based on geographical regions. This feature enables businesses to customize shipping methods, prices, and delivery options for different zones, optimizing the shipping experience for customers according to their specific locations. By defining multiple shipping zones, businesses can cater to a diverse customer base and ensure accurate shipping costs are applied.","functionCall":null},"finishReason":"stop"}],"usage":{"promptTokens":3976,"completionTokens":77,"totalTokens":4053}},"expense":4053,"word":68}',
                'unique_identifier' => '',
                'provider' => 'openai',
                'expense' => 4053.0,
                'expense_type' => 'token',
                'type' => 'chatbot_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-7),
            ),
            26 => 
            array (
                'id' => 58,
                'parent_id' => 49,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
                'raw_response' => NULL,
                'unique_identifier' => '',
                'provider' => NULL,
                'expense' => NULL,
                'expense_type' => NULL,
                'type' => 'visitor_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-7),
            ),
            27 => 
            array (
                'id' => 59,
                'parent_id' => 49,
                'user_id' => NULL,
                'title' => NULL,
                'content' => NULL,
                'filtered_content' => NULL,
            'raw_response' => '{"content":"Yes, Martvill is equipped with powerful search engine optimization (SEO) features designed to help businesses improve their website\'s visibility and attract organic traffic from search engines. This includes optimizing product pages, content, and overall website structure to rank higher in search engine results.","response":{"id":"chatcmpl-AI9MdjLT9l0NTF2IURfqvpEmadvrH","object":"chat.completion","created":1728889263,"model":"gpt-4o-mini-2024-07-18","choices":[{"index":0,"message":{"role":"assistant","content":"Yes, Martvill is equipped with powerful search engine optimization (SEO) features designed to help businesses improve their website\'s visibility and attract organic traffic from search engines. This includes optimizing product pages, content, and overall website structure to rank higher in search engine results.","functionCall":null},"finishReason":"stop"}],"usage":{"promptTokens":3974,"completionTokens":52,"totalTokens":4026}},"expense":4026,"word":43}',
                'unique_identifier' => '',
                'provider' => 'openai',
                'expense' => 4026.0,
                'expense_type' => 'token',
                'type' => 'chatbot_reply',
                'status' => 'Active',
                'created_at' => offsetDate(-7),
            ),
        ));
        
        
    }
}

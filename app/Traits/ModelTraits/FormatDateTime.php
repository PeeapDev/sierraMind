<?php
/**
 * @package FormattedDate
* @author Mohamed <dev@peeap.com>
 * @contributor Sabbi <[dev@peeap.com]>
 * @contributor  Mamun <[dev@peeap.com]>
 * @created 20-05-2024
 * @modified 04-10-2024
 */

namespace App\Traits\ModelTraits;

trait FormatDateTime
{
	/**
	 * Get formatted date and time for created_at attribute.
	 *
	 * @param string $date
	 * @return string|null
	 */
	public function getFormatCreatedAtAttribute(): ?string
	{
		return $this->getDateAndTime('created_at');
	}

	/**
	 * Get formatted date only for created_at attribute.
	 *
	 * @param string $date
	 * @return string|null
	 */
	public function getFormatCreatedAtOnlyDateAttribute(): ?string
	{
		return $this->getDate('created_at');
	}

	/**
	 * Get formatted time only for created_at attribute.
	 *
	 * @param string $date
	 * @return string|null
	 */
	public function getFormatCreatedAtOnlyTimeAttribute(): ?string
	{
		return $this->getTime('created_at');
	}

	/**
	 * Get formatted date and time for updated_at attribute.
	 *
	 * @param string $date
	 * @return string|null
	 */
	public function getFormatUpdatedAtAttribute(): ?string
	{
		return $this->getDateAndTime('updated_at');
	}

	/**
	 * Get formatted date only for updated_at attribute.
	 *
	 * @param string $date
	 * @return string|null
	 */
	public function getFormatUpdatedAtOnlyDateAttribute(): ?string
	{
		return $this->getDate('updated_at');
	}

	/**
	 * Get formatted time only for updated_at attribute.
	 *
	 * @param string $date
	 * @return string|null
	 */
	public function getFormatUpdatedAtOnlyTimeAttribute(): ?string
	{
		return $this->getTime('updated_at');
	}

	/**
	 * Format date and time.
	 *
	 * @param string $date
	 * @return string|null
	 */
	protected function getDateAndTime(string $date): ?string
	{
		return $this->formatDateTime($this->attributes[$date]);
	}

	/**
	 * Format date.
	 *
	 * @param string $date
	 * @return string|null
	 */
	protected function getDate(string $date): ?string
	{
		return $this->formatDate($this->attributes[$date]);
	}

	/**
	 * Format time.
	 *
	 * @param string $date
	 * @return string|null
	 */
	protected function getTime(string $date): ?string
	{
		return $this->formatTime($this->attributes[$date]);
	}

	/**
	 * Format date and time using helper functions.
	 *
	 * @param mixed $date
	 * @return string|null
	 */
	protected function formatDateTime($date): ?string
	{
		return timeZoneFormatDate($date) . ' ' . timeZoneGetTime($date);
	}

	/**
	 * Format date using helper function.
	 *
	 * @param mixed $date
	 * @return string|null
	 */
	protected function formatDate($date): ?string
	{
		return timeZoneFormatDate($date);
	}

	/**
	 * Format time using helper function.
	 *
	 * @param mixed $date
	 * @return string|null
	 */
	protected function formatTime($date): ?string
	{
		return timeZoneGetTime($date);
	}
}

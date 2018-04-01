export interface ListEntry {

    /**
     * Converts this model data to a HTML string.
     * This HTML string will be used to render the model in a list.
     * The Code must not include <li>...</li> tags.
     * @returns {string}
     */
    toHtml(): string;

    /**
     * Get the callback which should be executed when the user clicks on this entry.
     * @returns {{(event: Event): void}}
     */
    getCallback(): {(event: Event): void}

    /**
     * Get a sorting value which will be used to sort the entries of the list.
     * Lower value ==> On the top of the list
     * Higher value ==> On the bottom of the list.
     * @returns {number}
     */
    getSortingValue(): number
}
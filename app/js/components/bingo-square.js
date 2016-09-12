/* eslint-env browser */
'use strict';

import $ from 'jquery';
const squareTemplate = require('templates/bingo-card.html');

/**
 * @class
 */
class BingoSquare {
  /**
   * @param {string} term - The term for the square.
   * @param {number} colIndex - The column index of the square
   * @param {number} rowIndex - The row index of the square
   * @param {?boolean} free - If this is a free space.
   * @constructor
   */
  constructor(term, colIndex, rowIndex, free) {
    /** {jQuery} jQuery wrapped bingo square element. */
    this.$el = $(squareTemplate({
      name: term,
      free: Boolean(free)
    }));

    /** {HTMLElement} Bingo square element. */
    this.el = this.$el[0];

    /** @public {string} The term. */
    this._term = term;

    /** @private {number} Column index. */
    this._colIndex = colIndex;

    /** @private {number} Row index. */
    this._rowIndex = rowIndex;

    /** @private {boolean} Whether this square has been selected */
    this._selected = Boolean(free);

    /** @private {boolean} Whether this a free space. */
    this._free = Boolean(free);

    this._init();
  }

  /**
   * @method
   * @return {this} BingoSquare
   */
  _init() {
    if (!this._free) {
      this.$el.on('click', e => {
        e.preventDefault();
        this._toggleState();
      });
    }
    return this;
  }

  /**
   * @method
   * @private
   * @return {this} BingoSquare
   */
  _toggleState() {
    if (!this._free) {
      this._selected = !this._selected;
      const eventType = this._selected ? BingoSquare.Event.SELECTED :
        BingoSquare.Event.DESELECTED;
      const event = new $.Event(eventType);
      event.col = this.col();
      event.row = this.row();
      this.$el.trigger(event);

      if (this._selected) {
        this.$el.addClass(BingoSquare.CssClass.SELECTED);
      } else {
        this.$el.removeClass(BingoSquare.CssClass.SELECTED);
      }
    }
    return this;
  }

  /**
   * @method
   * @return {this} BingoSquare
   */
  reset() {
    if (!this._free) {
      this._selected = false;
      this.$el.removeClass(BingoSquare.CssClass.SELECTED);
    }
    return this;
  }

  /**
   * @method
   * @return {boolean} If this square has been selected.
   */
  isSelected() {
    return this._selected;
  }

  /**
   * @method
   * @return {string} The name of this square.
   */
  name() {
    return this._term;
  }

  /**
   * @method
   * @return {string} The column index of this square.
   */
  col() {
    return this._colIndex;
  }

  /**
   * @method
   * @return {string} The row index of this square.
   */
  row() {
    return this._rowIndex;
  }
}

/**
 * CSS classes used by this component.
 * @enum {string}
 */
BingoSquare.CssClass = {
  SELECTED: 'selected'
};

/**
 * Events used by this component.
 * @enum {string}
 */
BingoSquare.Event = {
  DESELECTED: 'squareDeslected',
  SELECTED: 'squareSelected'
};

export default BingoSquare;

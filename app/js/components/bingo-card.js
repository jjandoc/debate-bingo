/* eslint-env browser */
'use strict';

import $ from 'jquery';
import _ from 'underscore';
import BingoSquare from 'components/bingo-square';

/**
 * @class
 */
class BingoCard {
  /**
   * @param {HTMLElement} el - An element that contains a table of data and
   *   will act as parent container for the chart.
   * @param {Array.<string>} terms - Array of possible bingo terms.
   * @constructor
   */
  constructor(el, terms) {
    /** @private {HTMLElement} Bingo card element. */
    this._el = el;

    /** @private {jQuery} Bingo card element in a jQuery wrapper. */
    this._$el = $(el);

    /** @private {Array.<string>} Possible bingo terms. */
    this._possibleTerms = terms;

    /** @private {Array.<BingoSquare>>} Colleciton of bingo squares. */
    this._squares = [];

    /** @private {Boolean} Whether this card has bingoed. */
    this._hasBingoed = false;

    this._init();
  }

  /**
   * @method
   * @return {this} BingoCard
   */
  _init() {
    this._$el.on(BingoSquare.Event.SELECTED, e => {
      if (this.isBingo(e.col, e.row) && !this._hasBingoed) {
        this._hasBingoed = true;
        this._$el.trigger(BingoCard.Event.BINGO);
      }
    });
    this.refresh();
    return this;
  }

  /**
   * Deselects all squares.
   * @method
   * @return {this} BingoCard
   */
  reset() {
    _.each(this._squares, square => {
      square.reset();
    });
    this._hasBingoed = false;
    return this;
  }

  /**
   * Refreshes the card with new squares.
   * @method
   * @return {this} BingoCard
   */
  refresh() {
    const centerFree = BingoCard.SIZE % 2 === 1;
    const numTerms = centerFree ? (BingoCard.SIZE * BingoCard.SIZE) - 1 :
        BingoCard.SIZE * BingoCard.SIZE;
    let terms = _.chain(this._possibleTerms).shuffle().value()
        .slice(0, numTerms);

    this._squares = [];
    this._hasBingoed = false;
    this._$el.empty();

    if (centerFree) {
      terms.splice(terms.length / 2, 0, BingoCard.FREE);
    }

    _.each(terms, (term, i) => {
      const colIndex = i % BingoCard.SIZE;
      const rowIndex = Math.floor(i / BingoCard.SIZE);
      const free = term === BingoCard.FREE;
      const square = new BingoSquare(term, colIndex, rowIndex, free);
      this._squares.push(square);
    });

    for (let i = 0; i < this._squares.length; i += BingoCard.SIZE) {
      const $row = $(`<div class="${BingoCard.CssClass.ROW}">`);
      const squares = this._squares.slice(i, i + BingoCard.SIZE);
      _.each(squares, square => {
        $row.append(square.el);
      });
      this._$el.append($row);
    }

    return this;
  }

  /**
   * @method
   * @param {number} col - Column index.
   * @param {number} row - Row index.
   * @return {boolean} Whether any bingo has been completed.
   */
  isBingo(col, row) {
    return this._isRowBingo(row) || this._isColumnBingo(col) ||
        this._isDiaganolBingo(col, row);
  }

  /**
   * @private
   * @param {number} row - Index of row to check.
   * @return {boolean} Whether the row is a bingo.
   */
  _isRowBingo(row) {
    const initialIndex = row * BingoCard.SIZE;
    for (let i = initialIndex; i < initialIndex + BingoCard.SIZE; i++) {
      if (!this._squares[i].isSelected()) {
        return false;
      }
    }
    return true;
  }

  /**
   * @private
   * @param {number} col - Index of col to check.
   * @return {boolean} Whether the column is a bingo.

   */
  _isColumnBingo(col) {
    for (let i = col; i < this._squares.length; i += BingoCard.SIZE) {
      if (!this._squares[i].isSelected()) {
        return false;
      }
    }
    return true;
  }

  /**
   * @private
   * @param {number} col - Column index.
   * @param {number} row - Row index.
   * @return {boolean} Whether a diaganol bingo has been completed.
   */
  _isDiaganolBingo(col, row) {
    if (col === row) {
      // Check a top left to bottom right diaganol.
      for (let i = 0; i < BingoCard.SIZE; i++) {
        const squareIndex = i * BingoCard.SIZE + i;
        if (!this._squares[squareIndex].isSelected()) {
          return false;
        }
      }
    } else if (col === (BingoCard.SIZE - 1) - row) {
      // Check a top right to bottom left diaganol.
      for (let i = 1; i <= BingoCard.SIZE; i++) {
        const squareIndex = (BingoCard.SIZE * i) - i;
        if (!this._squares[squareIndex].isSelected()) {
          return false;
        }
      }
    } else {
      return false;
    }
    return true;
  }
}

/**
 * CSS classes used by this component.
 * @enum {string}
 */
BingoCard.CssClass = {
  ROW: 'row'
};

/**
 * Events used by this component.
 * @enum {string}
 */
BingoCard.Event = {
  BINGO: 'bingo'
};

/**
 * Number of rows/columns.
 * @constant {number}
 */
BingoCard.SIZE = 5;

/**
 * String value for a free square.
 * @constant {number}
 */
BingoCard.FREE = 'Free';

export default BingoCard;

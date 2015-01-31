'use strict';

var MaskedInput = require('ampersand-input-view-masked');
var extend = require('extend');

/**
 * changes mask based on if the user is entering an AMEX or not.
 *
 */
var optionDefaults = {
  name    : 'cardNumber',
  type    : 'tel',
  mask    : '(GO99 999999 99999)|(9999 9999 9999 9999)',
  maskOptions: {
    definitions: {
      "G": {
        validator: "3",
        cardinality: 1
      },
      "O": {
        validator: "[47]",
        cardinality: 1
      }
    }
  }
};

var CreditCardInput = MaskedInput.extend({
  constructor: function (opts) {
    arguments[0] = extend({}, optionDefaults, opts);

    MaskedInput.apply(this, arguments);
  },

  initialize: function () {
    MaskedInput.prototype.initialize.apply(this, arguments);

    this.addTest(function (val) {
      if (!(this.$input).inputmask('isComplete')) return 'Please complete';
    })
  },

  clean: function (val) {
    return val.replace(/\D/ig, '');
  }
});

module.exports = CreditCardInput;
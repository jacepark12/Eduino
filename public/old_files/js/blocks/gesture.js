/**
 * Created by parkjaesung on 2016. 9. 3..
 */


goog.provide('Blockly.Blocks.gestures');

goog.require('Blockly.Blocks');


Blockly.Blocks.gestures.HUE = 210;

Blockly.Blocks['gesture_wave_in_text'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("WAVE_IN");
        this.setOutput(true, null);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['gesture_wave_out_text'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("WAVE_OUT");
        this.setOutput(true, null);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['gesture_fist_text'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("FIST");
        this.setOutput(true, null);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['gesture_double_tap_text'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("DOUBLE TAP");
        this.setOutput(true, null);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['gesture_get'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("GET GESTURE");
        this.setOutput(true, null);
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};
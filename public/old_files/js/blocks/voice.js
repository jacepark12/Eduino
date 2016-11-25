/**
 * Created by parkjaesung on 2016. 9. 3..
 */
goog.provide('Blockly.Blocks.voice');

goog.require('Blockly.Blocks');

Blockly.Blocks.voice.HUE = 260;

Blockly.Blocks['voice_input_get'] = {
    init: function() {
        this.setPreviousStatement(true, null);
        this.appendDummyInput()
            .appendField("Get Voice Input");
        this.setOutput(true, "String");
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

//return true if voice input contains input string
Blockly.Blocks['voice_input_contains'] = {
    init: function() {
        this.appendValueInput("NAME")
            .setCheck("Boolean")
            .appendField("Voice Input Contains");
        this.setOutput(true, null);
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['voice_speak'] = {
    init: function() {
        this.setPreviousStatement(true, null);
        this.appendDummyInput()
            .appendField("Say");
        this.appendValueInput("HI")
            .setCheck("String");
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};
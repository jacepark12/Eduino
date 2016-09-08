/**
 * Created by parkjaesung on 2016. 9. 3..
 */

goog.provide('Blockly.JavaScript.voice');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['voice_input_get'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'VoiceBind.getVoiceInput();';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};


function CameraShakeContent(tabContentID, style, title) {
    this.frequencyLabel = null;
    this.frequencyField = null;
    this.shakeDurationLabel = null;
    this.shakeDurationField = null;
    GuiTabContent.call(this, tabContentID, style, title);
}
gGuiBase.View.inheritPrototype(CameraShakeContent, GuiTabContent);

// set initial values to default values of camera
CameraShakeContent.prototype.initialize = function () {
    var textStyle = 'margin-left: 10px; margin-top: 4px';
    var textFieldStyle = 'width: 90%; margin-left: 10px';

    this.frequencyLabel = new Text("frequencyLabel", textStyle, "Frequency");
    this.frequencyField = new TextField("frequencyField", textFieldStyle, "5");
    this.shakeDurationLabel = new Text("shakeDurationLabel", textStyle, "Duration");
    this.shakeDurationField = new TextField("shakeDurationField", textFieldStyle, "300");
    this.widgetList.push(this.frequencyLabel);
    this.widgetList.push(this.frequencyField);
    this.widgetList.push(this.shakeDurationLabel);
    this.widgetList.push(this.shakeDurationField);
};

// initialize text fields
CameraShakeContent.prototype.initializeEventHandling = function () {
    this.frequencyField.setOnFocusOut(this.onTextFieldFocusOut);
    this.shakeDurationField.setOnFocusOut(this.onTextFieldFocusOut);
};

// set camera to settings on focus out
CameraShakeContent.prototype.onTextFieldFocusOut = function() {
    var frequency = $('#frequencyField').val();
    var duration = $('#shakeDurationField').val();
    var camera = gGuiBase.Core.selectedCamera;
    camera.setShake(frequency, duration);
};

// sets transforms fields to the selected cameras
CameraShakeContent.prototype.updateFields = function( camera ) {
    var interpolateVals = camera.getShake();
    $('#frequencyField').val(interpolateVals[0]);
    $('#shakeDurationField').val(interpolateVals[1]);
};


function CameraInterpolateContent(tabContentID, style, title) {
    this.stiffnessLabel = null;
    this.stiffField = null;
    this.durationLabel = null;
    this.durationField = null;
    GuiTabContent.call(this, tabContentID, style, title);
}
gGuiBase.View.inheritPrototype(CameraInterpolateContent, GuiTabContent);

// set initial values to default values of camera
CameraInterpolateContent.prototype.initialize = function () {
    var textStyle = 'margin-left: 10px; margin-top: 4px';
    var textFieldStyle = 'width: 90%; margin-left: 10px';
    this.stiffnessLabel = new Text("stiffnessLabel", textStyle, "Stiffness");
    this.stiffField = new TextField("stiffField", textFieldStyle, "0.1");
    this.durationLabel = new Text("durationLabel", textStyle, "Duration");
    this.durationField = new TextField("durationField", textFieldStyle, "300");
    this.widgetList.push(this.stiffnessLabel);
    this.widgetList.push(this.stiffField);
    this.widgetList.push(this.durationLabel);
    this.widgetList.push(this.durationField);
};

// initialize text fields
CameraInterpolateContent.prototype.initializeEventHandling = function () {
    this.stiffField.setOnFocusOut(this.onTextFieldFocusOut);
    this.durationField.setOnFocusOut(this.onTextFieldFocusOut);
};

// set interpolation to settings on focus out
CameraInterpolateContent.prototype.onTextFieldFocusOut = function(textField) {
    var value = textField.val();
    var stiffness = $('#stiffField').val();
    var duration = $('#durationField').val();
    var camera = gGuiBase.Core.selectedCamera;
    camera.configInterpolation(stiffness, duration);
};

// sets interpolation fields to the selected cameras
CameraInterpolateContent.prototype.updateFields = function( camera ) {
    var interpolateVals = camera.getInterpolateConfig();
    $('#stiffField').val(interpolateVals[0]);
    $('#durationField').val(interpolateVals[1]);
};

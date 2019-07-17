import clone from "clone";

class CustomContextPadProvider {
  constructor (viewer, updateTaskType){
    this.updateTaskType =updateTaskType;
    viewer.get("contextPad").registerProvider(this);

  }
  getContextPadEntries=(element)=>{
    const {updateTaskType} =this;
    let type = element.type.split(":")[1];
    if (
      type !== "UserTask" &&
      type !== "ServiceTask" &&
      type !== "ScriptTask"
    ) {
      return;
    }
    const options = {
      configuration: {
        group: "edit",
        className: "fa fa-gears",
        title: "Configuration",
        action: {
          click: function(e) {
            let data_config, name;
            let businessObject = element.businessObject;

            if (type === "ServiceTask" || type === "UserTask") {
              if (
                businessObject.hasOwnProperty("extensionElements") &&
                businessObject.extensionElements.hasOwnProperty("values")
              ) {
                for (
                  var i = 0;
                  i < businessObject.extensionElements.values.length;
                  i++
                ) {
                  var el = businessObject.extensionElements.values[i];
                  if (el.$type === "camunda:InputOutput") {
                    data_config = {
                      class_name: businessObject.class,
                      parameters: clone(el)
                    };
                  }
                }
              }

              name = businessObject.name;
            } else if (type === "ScriptTask") {
              if (businessObject.hasOwnProperty("script")) {
                data_config = { script: businessObject.script };
              }
            }

            updateTaskType(type, {
              id: element.id,
              name: name,
              data_config
            });
          }
        }
      }
    };

    return options;
  }
}
export default CustomContextPadProvider;

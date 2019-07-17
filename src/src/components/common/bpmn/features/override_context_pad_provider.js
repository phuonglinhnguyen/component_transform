const OverrideContextPadProvider = ({
  showViewInstances,
  showModification
}) => {
  const ContextPadProvider = contextPad => {
    contextPad.registerProvider(this);
    this.getContextPadEntries = function(element) {
      let type = element.type.split(":")[1];
      if (
        type === "StartEvent" ||
        type === "EndEvent" ||
        type === "bpmn:SequenceFlow" ||
        type === "label"
      ) {
        return;
      }

      const options = {
        exchange: {
          group: "edit",
          className: "fa fa-exchange",
          title: "Exchange",
          action: {
            click: function(e) {
              showModification(element);
            }
          }
        }
      };

      if (type === "UserTask") {
        options.list = {
          group: "edit",
          className: "fa fa-list-alt",
          title: "Instances",
          action: {
            click: function(e) {
              showViewInstances(element);
            }
          }
        };
      }
      return options;
    };
  };

  ContextPadProvider.$inject = ["contextPad"];

  let overrideModule = {
    contextPadProvider: ["type", ContextPadProvider]
  };

  return overrideModule;
};

export default OverrideContextPadProvider;

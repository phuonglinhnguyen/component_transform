import pre_defined_guis from '../../../../resources/pre_defined_guis';

export const parseJsonToParams = (layouts, data_config, call_getSections) => {
  let task,
    type_data = 'text',
    input_data,
    entries = [],
    layout_name,
    section_name;
  if (data_config) {
    const inputParameters = data_config.parameters.inputParameters;
    inputParameters.forEach(function(element) {
      if (element.name === 'form_uri') {
        let key = element.value.split('/')[0];
        let form = pre_defined_guis.find(f => f.path.includes(key));
        if (form) {
          task = form.path;

          let arr = element.value.split('/');

          if (task.includes('verifying')) {
            layout_name = arr[3];
            section_name = arr[4];
          } else if (task.includes('invoice')) {
            layout_name = arr[3];
            section_name = '';
          } else {
            layout_name = arr[2];
            section_name = arr[3];
          }

          let layout_index = layouts.findIndex(l => l.name === layout_name);
          if (layout_index === -1) {
            layout_name = null;

            call_getSections(-1);
          } else {
            call_getSections(layout_index);
          }
        }
      } else if (element.name === 'input_data') {
        type_data = element.definition ? 'map' : 'text';
        if (type_data === 'map') {
          if (element.definition.entries) {
            element.definition.entries.forEach(function(e) {
              entries.push({ key: e.key, value: e.value });
            }, this);
          }
        } else {
          input_data = element.value;
        }
      }
    }, this);
  }
  return { task, type_data, input_data, layout_name, section_name, entries };
};

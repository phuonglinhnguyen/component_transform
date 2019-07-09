const onAddConfig = () => {
    const config = {
      name: "DA_HOAI 7s",
      cron_trigger: "0/1000 * * * * ?",
      active: false,
      project_id: "5b9f49f8ea99f2002092b9cc",
      version: "0.0",
      filter: {
        collector: {
          doc_status: "301",
          batch_status: "",
          doc_set_status: ""
        },
        transform: {
          pattern: ""
        }
      },
      rules: {
        content: {
          wahrung: {
            value: "function(input){ return input;}",
            dataKey: "wahrung"
          },
          debitor_nr: {
            value: "function(input){ return input;}",
            dataKey: "debitor_nr"
          },
          rechnungsdatum: {
            value: "function(input){ return input;}",
            dataKey: "rechnungsdatum"
          },
          sachkonto_kto: {
            value: "function(input){ return input;}",
            dataKey: "sachkonto_kto"
          },
          note: {
            value: "function(input){ return input;}",
            dataKey: "note"
          },
          betriebsstellen_bst: {
            value: "function(input){ return input;}",
            dataKey: "betriebsstellen_bst"
          },
          lieferanten_name: {
            value: "function(input){ return input;}",
            dataKey: "lieferanten_name"
          },
          netto: {
            value: "function(input){ return input;}",
            dataKey: "netto"
          },
          kostenstelle_kst: {
            value: "function(input){ return input;}",
            dataKey: "kostenstelle_kst"
          },
          steuerbetrag: {
            value: "function(input){ return input;}",
            dataKey: "steuerbetrag"
          },
          brutto: {
            value: "function(input){ return input;}",
            dataKey: "brutto"
          },
          lieferanten_nr_bbn: {
            value: "function(input){ return input;}",
            dataKey: "lieferanten_nr_bbn"
          },
          abteilung_abt: {
            value: "function(input){ return input;}",
            dataKey: "abteilung_abt"
          },
          "mahnstufe ": {
            value: "function(input){ return input;}",
            dataKey: "mahnstufe "
          },
          auftragsbestell_nr: {
            value: "function(input){ return input;}",
            dataKey: "auftragsbestell_nr"
          },
          instructrion: {
            value: "function(input){ return input;}",
            dataKey: "instructrion"
          },
          land: {
            value: "function(input){ return input;}",
            dataKey: "land"
          },
          lieferschein_nr: {
            value: "function(input){ return input;}",
            dataKey: "lieferschein_nr"
          },
          debitor_name: {
            value: "function(input){ return input;}",
            dataKey: "debitor_name"
          },
          innenauftrag_ia: {
            value: "function(input){ return input;}",
            dataKey: "innenauftrag_ia"
          },
          "rechnungtype ": {
            value: "function(input){ return input;}",
            dataKey: "rechnungtype "
          },
          steuerstatz: {
            value: "function(input){ return input;}",
            dataKey: "steuerstatz"
          },
          rechnung_nr: {
            value: "function(input){ return input;}",
            dataKey: "rechnung_nr"
          },
          vertragsnr_fm: {
            value: "function(input){ return input;}",
            dataKey: "vertragsnr_fm"
          }
        }
      },
      dictionary: [
        {
          fieldKey: "lookup_Export_fieldA",
          database_type: "MongoDB",
          host: "sit-mgdb.digi-texx.vn",
          port: "27017",
          username: "",
          password: "",
          database_name: "phoenix",
          schema_name: "5c18695273ea2000234651f6_acquisition_item_management",
          query: {
            _id: "?"
          }
        }
      ]
    };
    createData(config);
  };
  const onDeleteConfig = () => {
    const config = {
      id: "5d135922a9d7d94098934b85",
      name: "DA_HOAI 9",
      cron_trigger: "0/1000 * * * * ?",
      active: false,
      project_id: "5b9f49f8ea99f2002092b9cc",
      version: "0.0",
      filter: {
        collector: {
          doc_status: "301",
          batch_status: "",
          doc_set_status: ""
        },
        transform: {
          pattern: ""
        }
      },
      rules: {
        content: {
          wahrung: {
            value: "function(input){ return input;}",
            dataKey: "wahrung"
          },
          debitor_nr: {
            value: "function(input){ return input;}",
            dataKey: "debitor_nr"
          },
          rechnungsdatum: {
            value: "function(input){ return input;}",
            dataKey: "rechnungsdatum"
          },
          sachkonto_kto: {
            value: "function(input){ return input;}",
            dataKey: "sachkonto_kto"
          },
          note: {
            value: "function(input){ return input;}",
            dataKey: "note"
          },
          betriebsstellen_bst: {
            value: "function(input){ return input;}",
            dataKey: "betriebsstellen_bst"
          },
          lieferanten_name: {
            value: "function(input){ return input;}",
            dataKey: "lieferanten_name"
          },
          netto: {
            value: "function(input){ return input;}",
            dataKey: "netto"
          },
          kostenstelle_kst: {
            value: "function(input){ return input;}",
            dataKey: "kostenstelle_kst"
          },
          steuerbetrag: {
            value: "function(input){ return input;}",
            dataKey: "steuerbetrag"
          },
          brutto: {
            value: "function(input){ return input;}",
            dataKey: "brutto"
          },
          lieferanten_nr_bbn: {
            value: "function(input){ return input;}",
            dataKey: "lieferanten_nr_bbn"
          },
          abteilung_abt: {
            value: "function(input){ return input;}",
            dataKey: "abteilung_abt"
          },
          "mahnstufe ": {
            value: "function(input){ return input;}",
            dataKey: "mahnstufe "
          },
          auftragsbestell_nr: {
            value: "function(input){ return input;}",
            dataKey: "auftragsbestell_nr"
          },
          instructrion: {
            value: "function(input){ return input;}",
            dataKey: "instructrion"
          },
          land: {
            value: "function(input){ return input;}",
            dataKey: "land"
          },
          lieferschein_nr: {
            value: "function(input){ return input;}",
            dataKey: "lieferschein_nr"
          },
          debitor_name: {
            value: "function(input){ return input;}",
            dataKey: "debitor_name"
          },
          innenauftrag_ia: {
            value: "function(input){ return input;}",
            dataKey: "innenauftrag_ia"
          },
          "rechnungtype ": {
            value: "function(input){ return input;}",
            dataKey: "rechnungtype "
          },
          steuerstatz: {
            value: "function(input){ return input;}",
            dataKey: "steuerstatz"
          },
          rechnung_nr: {
            value: "function(input){ return input;}",
            dataKey: "rechnung_nr"
          },
          vertragsnr_fm: {
            value: "function(input){ return input;}",
            dataKey: "vertragsnr_fm"
          }
        }
      },
      dictionary: [
        {
          fieldKey: "lookup_Export_fieldA",
          database_type: "MongoDB",
          host: "sit-mgdb.digi-texx.vn",
          port: "27017",
          username: "",
          password: "",
          database_name: "phoenix",
          schema_name: "5c18695273ea2000234651f6_acquisition_item_management",
          query: {
            _id: "?"
          }
        }
      ]
    };
    deleteData(config);
  };
  const onUpdateConfig = () => {
    const config = {
      id: "5d22ed8fa9d7d94098034a1a",
      name: "DA_HOAI 10",
      cron_trigger: "0/1000 * * * * ?",
      active: false,
      project_id: "5b9f49f8ea99f2002092b9cc",
      version: "0.0",
      filter: {
        collector: {
          doc_status: "301",
          batch_status: "",
          doc_set_status: ""
        },
        transform: {
          pattern: ""
        }
      },
      rules: {
        content: {
          wahrung: {
            value: "function(input){ return input;}",
            dataKey: "wahrung"
          },
          debitor_nr: {
            value: "function(input){ return input;}",
            dataKey: "debitor_nr"
          },
          rechnungsdatum: {
            value: "function(input){ return input;}",
            dataKey: "rechnungsdatum"
          },
          sachkonto_kto: {
            value: "function(input){ return input;}",
            dataKey: "sachkonto_kto"
          },
          note: {
            value: "function(input){ return input;}",
            dataKey: "note"
          },
          betriebsstellen_bst: {
            value: "function(input){ return input;}",
            dataKey: "betriebsstellen_bst"
          },
          lieferanten_name: {
            value: "function(input){ return input;}",
            dataKey: "lieferanten_name"
          },
          netto: {
            value: "function(input){ return input;}",
            dataKey: "netto"
          },
          kostenstelle_kst: {
            value: "function(input){ return input;}",
            dataKey: "kostenstelle_kst"
          },
          steuerbetrag: {
            value: "function(input){ return input;}",
            dataKey: "steuerbetrag"
          },
          brutto: {
            value: "function(input){ return input;}",
            dataKey: "brutto"
          },
          lieferanten_nr_bbn: {
            value: "function(input){ return input;}",
            dataKey: "lieferanten_nr_bbn"
          },
          abteilung_abt: {
            value: "function(input){ return input;}",
            dataKey: "abteilung_abt"
          },
          "mahnstufe ": {
            value: "function(input){ return input;}",
            dataKey: "mahnstufe "
          },
          auftragsbestell_nr: {
            value: "function(input){ return input;}",
            dataKey: "auftragsbestell_nr"
          },
          instructrion: {
            value: "function(input){ return input;}",
            dataKey: "instructrion"
          },
          land: {
            value: "function(input){ return input;}",
            dataKey: "land"
          },
          lieferschein_nr: {
            value: "function(input){ return input;}",
            dataKey: "lieferschein_nr"
          },
          debitor_name: {
            value: "function(input){ return input;}",
            dataKey: "debitor_name"
          },
          innenauftrag_ia: {
            value: "function(input){ return input;}",
            dataKey: "innenauftrag_ia"
          },
          "rechnungtype ": {
            value: "function(input){ return input;}",
            dataKey: "rechnungtype "
          },
          steuerstatz: {
            value: "function(input){ return input;}",
            dataKey: "steuerstatz"
          },
          rechnung_nr: {
            value: "function(input){ return input;}",
            dataKey: "rechnung_nr"
          },
          vertragsnr_fm: {
            value: "function(input){ return input;}",
            dataKey: "vertragsnr_fm"
          }
        }
      },
      dictionary: [
        {
          fieldKey: "lookup_Export_fieldA",
          database_type: "MongoDB",
          host: "sit-mgdb.digi-texx.vn",
          port: "27017",
          username: "",
          password: "",
          database_name: "phoenix",
          schema_name: "5c18695273ea2000234651f6_acquisition_item_management",
          query: {
            _id: "?"
          }
        }
      ]
    };
    updateData(config);
  };
  return (
    <div className={classes.container}>
      <button onClick={onAddConfig}>add</button>
      <button onClick={onUpdateConfig}>update</button>
      <button onClick={onDeleteConfig}>delete</button>
    </div>
  );
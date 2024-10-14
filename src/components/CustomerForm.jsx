import { ButtonItem, EmailRule, EmptyItem, Form, GroupItem, Label, PatternRule, RequiredRule, SimpleItem } from 'devextreme-react/form';
import { useMemo, useRef } from 'react';
import itMessages from "devextreme/localization/messages/it.json";
import enMessages from "devextreme/localization/messages/en.json";
import { loadMessages } from "devextreme/localization";

loadMessages(itMessages);
loadMessages(enMessages);

const provinces = [
  "Chieti", "L'Aquila", "Pescara", "Teramo",
];
provinces.sort();

const CustomerForm = () => {
  const formData = useRef({ firstname: '', lastname: '', datebirth: '', gender: '', mail: '', mobile: '', address: '', province: '', city: '', consent: '', mailingList: '', personalization: '' });
  const formRef = useRef(null);
  
  const colCount = screen.width < 768? 1 : 2;

  const textFieldEditorOptions = useMemo(()=>({
    labelMode: 'floating', 
    mode: 'text', 
    value: '' ,
    showClearButton: true
  }), [])
  const noDigitsPattern = /^[^0-9]+$/;
  const phonePattern = /^\+(?:\d\s?){6,14}\d$/;
  
  const dateEditorOptions = useMemo(()=>({
    labelMode: 'floating', 
    value: '' ,
    acceptCustomValue: false,
    openOnFieldClick: true,
    type: 'date',
    pickerType: "calendar",
    displayFormat:"dd/MM/yyyy",
    showClearButton: true,
    showDropDownButton: true,
    calendarOptions: {
      max: new Date(),
      firstDayOfWeek: 1
    }
  }), [])

  const gender = [
    { text: ('Male'), value: "M" },
    { text: ("Female"), value: "F" },
    { text: ("Other"), value: "O" },
    { text: ("Prefer not to tell"), value: "N" }
  ];
  
  const genderEditorOptions = useMemo(()=>({
    dataSource: gender,
    displayExpr: 'text',
    valueExpr: 'value',
    labelMode: 'floating', 
    mode: 'text', 
    value: '' ,
    showClearButton: true,
    showDropDownButton: true,
    placeholder: ('Select...')
  }), []);
  
  const provinceEditorOptions = useMemo(()=>({
    dataSource: provinces,
    labelMode: 'floating', 
    mode: 'text', 
    value: '' ,
    showClearButton: true
  }), []);
  
  const consentEditorOptions = useMemo(()=>({
    text: ('I consent to the processing of my data *'),
    value: false,
    width: '90%',
  }), [])

  const mandatoryRender = () => <p className='text-start ms-3'>{'* '+('Required fields')}</p>;
  
  const submitButtonOptions = useMemo(()=>({
    text: ('submit'),  
    type: 'default',
    useSubmitBehavior: true,
    width: '100%',
  }), []);

  const onSubmit = () => {
    console.log('onSubmit customer');
  }
  
  return (
    <form onSubmit={onSubmit} >
      <Form 
          id="customerForm"
          ref={formRef}
          formData={formData.current}
          showValidationSummary={true} 
          className='px-4 px-sm-5'
          colCount={colCount}
          >
        
        <GroupItem 
          caption={('Personal Data')}
          >
          <SimpleItem 
            dataField='firstname' 
            editorType="dxTextBox" 
            isRequired={true} 
            editorOptions={textFieldEditorOptions}
          >
            <RequiredRule message={('Required field')} />
            <PatternRule message={("Do not use digits in this field")}
                pattern={noDigitsPattern} />
            <Label visible={false} text={('Name')}/>
          </SimpleItem>

          <SimpleItem 
            dataField='lastname' 
            editorType="dxTextBox" 
            isRequired={true}
            editorOptions={textFieldEditorOptions}
            > 
            <RequiredRule message={('Required field')} /> 
            <PatternRule message={("Do not use digits in this field")}
                pattern={noDigitsPattern} />      
            <Label visible={false} text={('Surname')}/>
          </SimpleItem>

          <SimpleItem 
            dataField='datebirth' 
            editorType="dxDateBox"
            editorOptions={dateEditorOptions}
          > 
            <Label visible={false}  text={('Birth Date')}/>
          </SimpleItem>

          <SimpleItem 
            dataField='gender'
            editorType="dxSelectBox"
            editorOptions={genderEditorOptions}
            >
            <Label visible={false} text={('Gender')}/>
          </SimpleItem>

        </GroupItem>

        <GroupItem 
          caption={('Contacts')}>
          <SimpleItem 
            dataField='mail' 
            editorType="dxTextBox"
            editorOptions={textFieldEditorOptions}
            >
            <EmailRule message={('Email is not valid')} />
            <Label visible={false} text='e-mail'/>
          </SimpleItem>

          <SimpleItem 
            dataField='mobile'
            editorOptions={textFieldEditorOptions}
          >
            <PatternRule
                message={("Phone number must have country prefix")}
                pattern={phonePattern}
              />
            <Label visible={false} text={('Mobile')} />
          </SimpleItem>

          <EmptyItem />

          <SimpleItem 
            dataField='address' 
            editorType="dxTextBox"
            editorOptions={textFieldEditorOptions}
            >
            <Label visible={false} text={('Address')}/>
          </SimpleItem>

          <SimpleItem 
            dataField='province' 
            editorType="dxSelectBox" 
            editorOptions={provinceEditorOptions}>
            <Label visible={false} text={('Province')}/>
          </SimpleItem>

          <SimpleItem 
            dataField='city' 
            editorType="dxTextBox"
            editorOptions={textFieldEditorOptions}
            >
            <PatternRule message={("Do not use digits in this field")}
              pattern={noDigitsPattern} />
            <Label visible={false} text={('City')}/>
          </SimpleItem>

        </GroupItem>

        <SimpleItem 
          dataField='consent' 
          editorType='dxCheckBox' 
          editorOptions={consentEditorOptions} 
          isRequired={true} 
          colSpan={2}
        >
          <RequiredRule message={('Required field')} />
          <Label visible={false} />
        </SimpleItem>
        <SimpleItem render={mandatoryRender} />

        <ButtonItem 
          horizontalAlignment="center"
          colSpan={1}
          buttonOptions={submitButtonOptions} 
        />
      </Form>
    </form>
  )
}

export default CustomerForm

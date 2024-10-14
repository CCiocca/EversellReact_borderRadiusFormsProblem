import { useRef, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Form, { Item, Label, ButtonItem, ButtonOptions, RequiredRule } from 'devextreme-react/form';
import Cookies from 'js-cookie'

const LoginForm = () => {
  const navigate = useNavigate();
  const formData = useRef({ Customer: '', UserName:'', Password: '', isPersistent: false });
  const formRef = useRef(null);
  Cookies.get('customer')
  
  const companyEditorOptions = useMemo(() =>({ 
    labelMode: 'floating',     
    mode: 'text', 
    value: '',
    showClearButton: true
  }), []);
  const usernameEditorOptions = useMemo(()=>({ 
    labelMode: 'floating', 
    mode: 'text', 
    value: '',
    showClearButton: true
  }),[]);
  const passwordEditorOptions = useMemo(()=>({ 
    labelMode: 'floating', 
    mode: 'password',    
    value: '',
    buttons: [
      {
        name: 'password',
        location: 'after',
        options: {
          stylingMode: 'text',
          icon: 'eyeopen',
          onClick: (e) => changePasswordMode('Password', e),
        },
      },
    ],
  }), []);

  const rememberMeEditorOptions = useMemo(()=>({ 
    text: ('Remember me'), 
    elementAttr: { className: 'form-text' } 
  }), []);
  
  const changePasswordMode = useCallback((fieldName, e) => {
    const editor = formRef.current.instance().getEditor(fieldName);
    editor.option('mode', editor.option('mode') === 'text' ? 'password' : 'text');
    const buttonInstance = e.component;
    buttonInstance.option('icon', buttonInstance.option('icon') === 'eyeclose' ? 'eyeopen' : 'eyeclose') 
  }, []);

  useEffect(() => {
    onLoadRememberMe()
  },[])

  const onLoadRememberMe = () => {
    const dataField = ['Customer', 'UserName', 'Password', 'isPersistent' ]
    dataField.forEach((fieldName) => {
      const editor = formRef.current.instance().getEditor(fieldName);
      editor.option('value', Cookies.get(fieldName) ? Cookies.get(fieldName) : '');
    })
  };

  const onSubmit = useCallback(()=>{
    console.log('onSubmit');
  },[])

  const navigateCustomer = useCallback(()=>{
    navigate('/customer')
  },[])


  return (
    <>
    <form className='login-form' onSubmit={onSubmit}>
      <Form
        ref={formRef}
        formData={formData.current}
        showRequiredMark={false}
      >
        <Item dataField='Customer' editorType='dxTextBox' editorOptions={companyEditorOptions} >
          <RequiredRule message={('Required field')} />
          <Label visible={false} text={('Company')} />
        </Item>

        <Item dataField='UserName' editorType='dxTextBox' editorOptions={usernameEditorOptions}>
          <RequiredRule message={('Required field')} />
          <Label visible={false} text={('Username')} />
        </Item>

        <Item dataField='Password' editorType='dxTextBox' 
        editorOptions={passwordEditorOptions}
        >
          <RequiredRule message={('Required field')} />
          <Label visible={false} text={('Password')}/>
        </Item>

        <Item dataField='isPersistent' editorType='dxCheckBox' editorOptions={rememberMeEditorOptions}>
          <Label visible={false} />
        </Item>

        <ButtonItem>
          <ButtonOptions width='100%' type='default' useSubmitBehavior>
            <span className='dx-button-text'>{('Sign In')}</span>
          </ButtonOptions>
        </ButtonItem>

      </Form> 
    </form>

    <button onClick={navigateCustomer}>
      Customer Page
    </button>
    </>
  );
}

export default LoginForm;

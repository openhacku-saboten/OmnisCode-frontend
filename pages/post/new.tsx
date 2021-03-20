/* eslint-disable react/jsx-key */
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useRef } from 'react';

import Editor from '@monaco-editor/react';

import { Grid, Button, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { langs } from '../../utils/language';

const Home: NextPage = () => {
  //プルダウンメニュー(言語)
  const [language, setLanguage] = React.useState('cpp');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setLanguage(event.target.value as string);
  };

  //プルダウンメニュー(モード)
  const [mode, setMode] = React.useState('light');

  const handleChange2 = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setMode(event.target.value as string);
  };

  //エラー関連(JavaScriptのみ波線が出て指摘)
  function handleEditorValidation(markers): void {
    // model markers
    markers.forEach((marker) => console.log('onValidate:', marker.message));
  }

  //1(上の入力欄)(テスト)
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco): void {
    editorRef.current = editor;
  }
  //テストアラート
  function showValue(): void {
    alert(editorRef.current.getValue());
  }

  //2(下の入力欄)
  const editorRefMd = useRef(null);

  function handleEditorDidMountMd(editor, monaco): void {
    editorRefMd.current = editor;
  }
  //テストアラート
  function showValue2(): void {
    alert(editorRefMd.current.getValue());
  }

  //text入力欄のデータを取得(テスト)
  function showValueURL(): void {
    // 値を取得
    // const url = document.getElementById('textareaURL').value;
    // https://stackoverflow.com/questions/12989741/the-property-value-does-not-exist-on-value-of-type-htmlelement
    // 参考
    const inputElement = document.getElementById(
      'textareaURL'
    ) as HTMLInputElement;
    const inputValue = inputElement.value;
    //テストアラート
    window.alert(inputValue);
  }

  //投稿ボタンが押された時(本番)
  function submit(): void {
    const inputElement = document.getElementById(
      'textareaURL'
    ) as HTMLInputElement;
    const inputValueURL = inputElement.value;

    alert(
      'URL:' +
        inputValueURL +
        '\n' +
        '言語:' +
        language +
        '\n' +
        'コード:' +
        editorRef.current.getValue() +
        '\n' +
        '説明:' +
        editorRefMd.current.getValue()
    );
  }

  return (
    <>
      <Head>
        <title>OmnisCode</title>
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content="OmnisCode" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ocode.one" />
        <meta property="og:image" content="https://sample.png" />
        <meta property="og:site_name" content="OmnisCode" />
        <meta
          property="og:description"
          content="OmnisCode | コードを共有するSNS"
        />
      </Head>
      <Grid container alignItems="center" justify="center">
        <Grid item sm={7}>
          <h1>投稿ページ</h1>
          <h3>1. AtCoderの問題のリンクを入力</h3>

          <TextField id="textareaURL" style={{ width: '100%' }} label="URL" />
          {/* <button onClick={showValueURL}>Show value</button> */}

          <h3>2. コードを入力</h3>

          <div style={{ marginBottom: '15px' }}>
            <FormControl style={{ width: '30%' }}>
              <InputLabel id="demo-simple-select-label">言語</InputLabel>
              <Select value={language} onChange={handleChange}>
                {langs.map((rang) => (
                  <MenuItem value={rang.id}>{rang.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={{ width: '30%', marginLeft: '2%' }}>
              <InputLabel id="demo-simple-select-label">
                エディタのテーマ
              </InputLabel>
              <Select value={mode} onChange={handleChange2}>
                <MenuItem value={'light'}>light</MenuItem>
                <MenuItem value={'vs-dark'}>dark</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* {console.log(language)} */}
          <Editor
            onValidate={handleEditorValidation}
            onMount={handleEditorDidMount}
            theme={mode}
            width="100%"
            height="60vh"
            language={language}
            defaultValue="// コードを入力してください。"
          />
          {/* <button onClick={showValue}>Show value</button> */}

          <h3>3. 説明文を入力</h3>

          <Editor
            onMount={handleEditorDidMountMd}
            theme={mode}
            width="100%"
            height="60vh"
            defaultLanguage="markdown"
            defaultValue="# マークダウンで記述できます。"
          />
          {/* <button onClick={showValue2}>Show value</button> */}
          <Grid container alignItems="center" justify="center">
            <Button
              onClick={submit}
              size="large"
              variant="contained"
              color="primary"
              style={{
                marginBottom: '30px',
                marginTop: '30px',
                width: '60%',
              }}>
              投稿
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;

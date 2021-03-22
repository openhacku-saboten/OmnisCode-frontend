import { NextPage } from 'next';
import Head from 'next/head';
import React, { useRef } from 'react';

import Editor from '@monaco-editor/react';

import { Grid, Button, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { langs } from '../../utils/language';

const PostNew: NextPage = () => {
  //プレビュー機能
  interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    boxPadding: number;
  }

  function TabPanel(props: TabPanelProps): any {
    const { children, value, index, boxPadding, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && (
          <Box p={boxPadding}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: any): any {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const classes = useStyles();
  const [valueTab, setValue] = React.useState(0);

  const handleChangeTab = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ): any => {
    setValue(newValue);
  };
  //-------------------------------------------------------------------------
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

  //1(上の入力欄)(コード)
  const editorRef = useRef(null);

  function handleEditorDidMount(editor): void {
    editorRef.current = editor;
  }

  //2(下の入力欄)(説明)
  const editorRefMd = useRef(null);

  function handleEditorDidMountMd(editor): void {
    editorRefMd.current = editor;
  }

  //投稿ボタンが押された時(本番)
  function submit(): void {
    const inputElement = document.getElementById(
      'textareaURL'
    ) as HTMLInputElement;
    const inputValueURL = inputElement.value;

    //URLが正しいかを判定
    const regex = new RegExp(
      '(https?://([\\w-]+\\.)+[\\w-]+(/[\\w- .?%&=]*)?)'
    );
    const flagURL = regex.test(inputValueURL);

    //入力された文字をチェックする。
    if (flagURL == false) {
      window.alert('入力されたURLが不正です。');
      return;
    }
    if (editorRef.current.getValue() == '') {
      window.alert('コードが入力されていません。');
      return;
    }
    if (editorRefMd.current.getValue() == '') {
      window.alert('説明文が入力されていません。');
      return;
    }

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
          <h3>1. 競技プログラミングの問題のリンクを入力</h3>

          <TextField id="textareaURL" style={{ width: '100%' }} label="URL" />

          <h3>2. コードを入力</h3>

          <div style={{ marginBottom: '15px' }}>
            <FormControl style={{ width: '30%' }}>
              <InputLabel>言語</InputLabel>
              <Select value={language} onChange={handleChange}>
                {langs.map((lang, idx) => (
                  <MenuItem value={lang.id} key={idx}>
                    {lang.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={{ width: '30%', marginLeft: '2%' }}>
              <InputLabel>エディタのテーマ</InputLabel>
              <Select value={mode} onChange={handleChange2}>
                <MenuItem value={'light'}>light</MenuItem>
                <MenuItem value={'vs-dark'}>dark</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Editor
            onValidate={handleEditorValidation}
            onMount={handleEditorDidMount}
            theme={mode}
            width="100%"
            height="60vh"
            language={language}
            defaultValue="// コードを入力してください。"
          />

          <h3>3. 説明文を入力</h3>

          <div className={classes.root}>
            <AppBar position="static">
              <Tabs
                value={valueTab}
                onChange={handleChangeTab}
                aria-label="simple tabs example">
                <Tab label="編集" {...a11yProps(0)} />
                <Tab label="プレビュー" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={valueTab} index={0} boxPadding={0}>
              <Editor
                onMount={handleEditorDidMountMd}
                theme={mode}
                width="100%"
                height="60vh"
                defaultLanguage="markdown"
                defaultValue="# マークダウンで記述できます。"
              />
            </TabPanel>
            <TabPanel value={valueTab} index={1} boxPadding={0}>
              Item Two
            </TabPanel>
          </div>

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

export default PostNew;

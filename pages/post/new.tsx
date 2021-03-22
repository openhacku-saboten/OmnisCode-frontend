import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';

import Editor from '@monaco-editor/react';

import { Grid, Button, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import ReactMarkdown from 'react-markdown/with-html';

import { langs } from '../../utils/language';

const PostNew: NextPage = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      modal: {
        display: 'flex',
        justifyContent: 'center',
      },
      paper: {
        justifyContent: 'center',
        overflow: 'auto',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '50%',
      },
    })
  );

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

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

  //Codeが更新されたら呼び出される
  const [code, setCode] = useState<string>('');
  function handleCodeEditorChange(value): void {
    setCode(value);
  }

  //MDが更新されたら呼び出される
  const [mdCode, setMdCode] = useState<string>('');
  function handleMdEditorChange(value): void {
    setMdCode(value);
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
    if (code == '') {
      window.alert('コードが入力されていません。');
      return;
    }
    if (mdCode == '') {
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
        code +
        '\n' +
        '説明:' +
        mdCode
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
            onChange={handleCodeEditorChange}
            theme={mode}
            width="100%"
            height="60vh"
            language={language}
            defaultValue="// コードを入力してください。"
          />

          <h3>3. 説明文を入力</h3>

          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleOpen}>
            プレビュー
          </Button>

          <Editor
            onChange={handleMdEditorChange}
            theme={mode}
            width="100%"
            height="60vh"
            defaultLanguage="markdown"
            defaultValue="# マークダウンで記述できます。"
          />

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}>
            <Fade in={open}>
              <div className={classes.paper}>
                <ReactMarkdown source={mdCode} />
                <Grid container alignItems="center" justify="center">
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ margin: '15px' }}
                    onClick={handleClose}>
                    閉じる
                  </Button>
                </Grid>
              </div>
            </Fade>
          </Modal>

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

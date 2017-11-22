'use strict';
import React from 'react';
import LocalDb from 'localDb';
import TodoHeader from './TodoHeader.js';
import TodoMain from './TodoMain.js';
import TodoFooter from './TodoFooter.js';

class App extends React.Componet {
    constructor() { //定义App类的构造函数
        super();
        this.db = new LocalDb('ReactDemo');
    }
}
import Prism from 'prismjs' ;
import 'prismjs/components/prism-c';

import {html, css, LitElement, unsafeCSS} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {query} from 'lit/decorators/query.js';

import codeEditorCSS from './code-editor.css?inline' ;



@customElement('code-editor')
export class CodeEditor extends LitElement {
  static styles = unsafeCSS(codeEditorCSS);

  @state()
  language: string = 'language-c' ;
  @state()
  text: string = '' ;
  @state()
  code: string = '' ;
  @state()
  scrollTop: number = 0 ;
  @state()
  scrollLeft: number = 0 ;
  @state()
  lineNumbersContent: string = '1' ;

  @query('#code')
  _code ;
  @query('#lineNumbers')
  _lineNumbers ;

  textInput(event: any){
    let text = event.target.value ;
    if(text[text.length - 1] === '\n') text += ' ' ;
    const linesCount = text.split('\n').length ;
    let lineNumbersContent = '' ;
    for(let i = 1 ; i <= linesCount ; i ++) lineNumbersContent += i + '\n' ;
    this.code = Prism.highlight(text, Prism.languages['c'], 'c') ;
    this._code.innerHTML = this.code ;
    this.text = text ;
    this.lineNumbersContent = lineNumbersContent ;
  }

  scroll(event: any){
    const scrollTop = event.target.scrollTop ; 
    const scrollLeft = event.target.scrollLeft ; 
    this._code.scrollTop = scrollTop ;
    this._code.scrollLeft = scrollLeft ;
    this._lineNumbers.scrollTop = scrollTop ;
    this.scrollTop = scrollTop ; 
    this.scrollLeft = scrollLeft ;
  }

  textAreaTemplate(){
    return html`<textarea id="text" class='textEditing' spellcheck='false' @input=${this.textInput} @scroll=${this.scroll} ></textArea>` ;
  }

  codeTemplate(){
    return html`<pre class='codeHighlighting ${this.language}'><code class='${this.language}' id='code' ></code></pre>` ;
  }

  lineNumbersTemplate(){
    return html`<pre id='lineNumbers' class='lineNumbers'>${this.lineNumbersContent}</pre>` ;
  }

  render() {
    return html`<div class='codeEditor'>
                  ${this.textAreaTemplate()}
                  ${this.codeTemplate()}
                  ${this.lineNumbersTemplate()}
                </div>`;
  }

}











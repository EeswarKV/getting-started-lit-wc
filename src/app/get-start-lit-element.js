
// Import LitElement base class and html helper function
import { LitElement, html } from 'lit-element';
 
class GetStartLitElement extends LitElement {
  /**
   * Define properties. Properties defined here will be automatically 
   * observed.
   */
  static get properties() {
    return {
      myProperty: { type: String },
    };
  }

  /**  
   * In the element constructor, assign default property values.
   */
  constructor() {
    // Must call superconstructor first.
    super();
    // Initialize properties
    this.loadComplete = false;
    this.message = 'Hello i am lit element, i born from constructor';
    // this.pie = false;
  }
  
  /**
   * Implement firstUpdated to perform one-time work on first update:
   * - Call a method to load the lazy element if necessary
   * - Focus the checkbox
   */
  

  render() {
    return html`
        <h1>Hello Chota gang !!!</h1>
        <h2>${this.message}</h2>
        <h3>${this.myProperty}</h3>
        <input id="myinput"/>
        `;
  }
  /**
   * Implement firstUpdated to perform one-time work on first update:
   * Focus the inputbox
   */
  firstUpdated() {
    const myInput = this.shadowRoot.getElementById('myinput');
    myInput.placeholder="Name";
  }
}
 
// Register the element with the browser
customElements.define('get-start-lit-element', GetStartLitElement);
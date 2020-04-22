
import { LitElement, html } from 'lit-element';
import { styles } from './corona-lit.styles.js';
import { until } from 'lit-html/directives/until.js';
import axios from 'axios';

const formatterNumber = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0
})

let tableFlag = false;
class CoronaLit extends LitElement {

  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      data: Object,
      totalCases: Number,
      prop1: { type: Number }
    };
  }

  _sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = this.shadowRoot.getElementById('countries_stat');
    if (table) { 
      switching = true;
      // Set the sorting direction to ascending:
      dir = "asc";
      /* Make a loop that will continue until
      no switching has been done: */
      while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
          // Start by saying there should be no switching:
          shouldSwitch = false;
          /* Get the two elements you want to compare,
          one from current row and one from the next: */
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          /* Check if the two rows should switch place,
          based on the direction, asc or desc: */
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /* If a switch has been marked, make the switch
          and mark that a switch has been done: */
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          // Each time a switch is done, increase this count by 1:
          switchcount ++;
        } else {
          /* If no switching has been done AND the direction is "asc",
          set the direction to "desc" and run the while loop again. */
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    }
   
  }

  async _getHeaderData() { 
    await axios.get("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
      "headers": {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "4bb1c2a2d4msh19f45c1b5a00f7ep18b405jsnca8edf9c0b96" // don't forget to place your key here or the code will not work
      }
    })
      .then(response => {
        this.response = response;
        // console.log(response);
        this.data = this.response.data;
        this.totalCases = this.data.total_cases;
        this.newCases = this.data.new_cases;
        this.newDeath = this.data.new_deaths;
        this.totalDeath = this.data.total_deaths;
        this.totalRecovered = this.data.total_recovered;
      })
      .catch(err => {
        console.log(err);
      });
  }


  _printTableData(table) { 
    if (table) { 
      axios.get("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
        "headers": {
          "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
          "x-rapidapi-key": "4bb1c2a2d4msh19f45c1b5a00f7ep18b405jsnca8edf9c0b96" // don't forget to place your key here or the code will not work
        }
      }).then(response => {
        tableFlag = true;
        let countries_stat = response.data.countries_stat;
        console.log(countries_stat);
        for (let i = 0; i < countries_stat.length-1; i++){
          let k = i;
          k++;
          let row = table.insertRow(i+1);
          let country_name = row.insertCell(0);
          let cases = row.insertCell(1);
          let deaths = row.insertCell(2);
          let serious_critical = row.insertCell(3);
          let recovered_per_country = row.insertCell(4);
          country_name.innerHTML = countries_stat[k].country_name;
          cases.innerHTML = countries_stat[k].cases;
          deaths.innerHTML = countries_stat[k].deaths;
          serious_critical.innerHTML = countries_stat[k].serious_critical;
          recovered_per_country.innerHTML = countries_stat[k].total_recovered;
        }
        })
        .catch(err => {
          console.log(err);
        });
    }
  
    
    //Getting all the country statistic using a loop
        
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this._getHeaderData();
    // console.log(table);
  }

  updated() { 
    super.updated();
    const table = this.shadowRoot.getElementById('countries_stat');
    this._printTableData(table);
  }

  render() {
    if (this.totalCases) { 
      return html`
      <div class="wrapper">
        <h1 class="header-text">COVID19 live updates</h1>
      <div class="statistic">

          <div class="total_case_box">
              <h2>Total Cases</h2>
              <p id="total_cases">${this.totalCases}</p>
          </div>
         <div class="box_wrapper">
              <div class="box">
                  <h2>Total Death</h2>
                  <p id="total_death">${this.totalDeath}</p>
              </div>

              <div class="box">
                  <h2>Total Recovery</h2>
                  <p id="total_recovery">${this.totalRecovered}</p>
              </div>

              <div class="box">
                  <h2>New case</h2>
                  <p id="new_case">${this.newCases}</p>
              </div>

              <div class="box">
                  <h2>New Death</h2>
                  <p id="new_death">${this.newDeath}</p>
              </div>
         </div> 
      
         <table id="countries_stat">
             <tr>
                 <th @click ="${this.handleClick}" id="headingZero">Country</th>
                 <th id="heading1">Cases</th>
                 <th id="heading2">Deaths</th>
                 <th id="heading3">Serious critical</th>
                 <th id="heading4">Total recovered</th>
             </tr>
         </table>
      </div>
  </div>
      `;
    }
    return html`Loading .......`;
  }
}

customElements.define('corona-lit', CoronaLit);
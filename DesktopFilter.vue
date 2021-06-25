<template>

  <div class="st-dropdown-wrapper st-transition" v-if="!isDeviceMobile" :id="'desktop_filter'+filter.title" :class="{'st-filter-open': filter.isOpen}">
          <div class="st-dropdown-area">
            <div class="st-dynamic-filters" v-if="filter.type === 'textFacet'" :class="{'st-colors': filter.title === 'Color'}">
              <div class="st-checkbox" v-for="i in filter.selected" :key="i">
                <label class="active">
                  <input type="checkbox" :value="i" @change="$emit('applyFilter')" v-model="filter.selected">
                  <span class="st-item-checkbox" v-if="filter.title !== 'Color'"></span>
                  <span class="st-item-checkbox" v-else></span>
                  <span class="filter-name ">{{i}}</span>
                  <span class="st-count-filter">({{getSelectedCount(i,filter)}})</span>
                </label>
              </div>
              <div class="st-checkbox" v-for="i in getNotSelectedFilters(filter)" :key="i.name">
                <label>
                  <input type="checkbox" :value="i.name" @change="$emit('applyFilter'),filterAnalytics('left',filter.title,i.name)" v-model="filter.selected">
                  <span class="st-item-checkbox" v-if="filter.title !== 'Color'"></span>
                  <span class="st-item-checkbox" v-else></span>
                  <span class="filter-name">{{i.name}}</span>
                  <span class="st-count-filter">({{i.count}})</span>
                </label>
              </div>
            </div>
            <div class="st-dynamic-filters" v-else-if="filter.type === 'numericFacet'">
              <div class="st-checkbox" v-for="i in filter.selected" :key="i[0]">
                <label class="active">
                  <input type="checkbox" :value="[i[0],i[1]]" @change="$emit('applyFilter')" v-model="filter.selected">
                  <span class="st-item-checkbox"></span>
                  <span class="filter-name ">{{currSymbol}}{{i[0]}}
                    <span v-if="i[0] !== '60000'">- {{currSymbol}}{{i[1]}}</span>
                    <span v-else> And Above</span>
                  </span>
                  <span class="st-count-filter">({{getSelectedCount(i,filter)}})</span>
                </label>
              </div>
              <div class="st-checkbox" v-for="i in getNotSelectedFilters(filter)" :key="i.min">
                <label>
                  <input type="checkbox" :value="[i.min,i.max]" @change="$emit('applyFilter'),filterAnalytics('left',filter.title,[i.min,i.max])" v-model="filter.selected">
                  <span class="st-item-checkbox"></span>
                  <span class="filter-name">{{currSymbol}}{{i.min}}
                    <span v-if="i.min !== '60000'">- {{currSymbol}}{{i.max}}</span>
                    <span v-else> And Above</span>
                  </span>
                  <span class="st-count-filter">({{i.count}})</span>
                </label>
              </div>
            </div>
          </div>
        </div>
  <div v-else>
    <ul class="filter-list-desktop" v-show="filter.isOpen">
      <div v-if="filter.type === 'textFacet'">
          <li v-for="i in filter.selected" :key="i" class="active">
            <div class="outer-checkbox">
              <label class="st-flex">
                <input type="checkbox" :value="i" v-model="filter.selected" @change="$emit('applyFilter'),filterAnalytics('left',filter.title,i)">
                <span class="st-checkbox"></span>
                <div class="filter-label">{{i}}</div>
                <span class="number_of_product">({{getSelectedCount(i,filter)}})</span>
              </label>
            </div>
          </li>
          <li v-for="i in getNotSelectedFilters(filter)" :key="i.name">
            <div class="outer-checkbox">
              <label class="st-flex">
                <input type="checkbox" :value="i.name" v-model="filter.selected" @change="$emit('applyFilter'),filterAnalytics('left',filter.title,i.name)">
                <span class="st-checkbox"></span>
                <div class="filter-label">{{i.name}}</div>
                <span class="number_of_product">({{i.count}})</span>
              </label>
            </div>
          </li>
      </div>
      <div v-else-if="filter.type === 'numericFacet'">
        <li v-for="i in filter.selected" :key="i[0]" class="active">
          <div class="outer-checkbox">
            <label class="st-flex">
              <input type="checkbox" :value="[i[0],i[1]]" v-model="filter.selected" @change="$emit('applyFilter'),filterAnalytics('left',filter.title,[i[0],i[1]])">
              <span class="st-checkbox"></span>
              <div class="filter-label">{{ currSymbol }}{{ i[0] }}
                <span v-if="i[0] !== '60000'">- {{ currSymbol }}{{ i[1] }}</span>
                <span v-else> And Above</span>
              </div>
              <span class="number_of_product">({{getSelectedCount(i,filter)}})</span>
            </label>
          </div>
        </li>
        <li v-for="i in getNotSelectedFilters(filter)" :key="i.min">
          <div class="outer-checkbox">
            <label class="st-flex">
              <input type="checkbox" :value="[i.min,i.max]" v-model="filter.selected" @change="$emit('applyFilter'),filterAnalytics('left',filter.title,[i.min,i.max])">
              <span class="st-checkbox"></span>
              <div class="filter-label">{{ currSymbol }}{{ i.min }}
                <span v-if="i.min !== '60000'">- {{ currSymbol }}{{ i.max }}</span>
                <span v-else> And Above</span>
              </div>
              <span class="number_of_product">({{i.count}})</span>
            </label>
          </div>
        </li>
      </div>
    </ul>
  </div>

</template>
<script>
    import stAnalytics from "@/utils/analytics";
    let ga = new stAnalytics('ga', 'prod');
    export default {
      name: "DesktopFilter",
        props: ["filter"],
        data() {
            return{
              currSymbol: "₹ ",
              currency: '₹'
            }
        },
        methods:{
          replaceLast: function (string, charToReplace, charToBePlaced){
            let a = string.split("");
            a[string.lastIndexOf(charToReplace)] = charToBePlaced;
            return a.join("");
          },
          getSelectedValues: function (filter){
            let arr = "";
            if(filter.selected.length > 0){
              if(filter.type === 'textFacet')arr = filter.selected.toString().replaceAll(",",", ");
              else if(filter.type === 'numericFacet') {
                filter.selected.forEach((x)=>{
                  if(x[1] !== '10000000')arr += `${this.currSymbol}${x[0]} - ${this.currSymbol}${x[1]}, `;
                  else if(x[1] === '10000000') arr += `${this.currSymbol}${x[0]} And Above, `;
                });
                arr = this.replaceLast(arr,',','');
              }
            }
            return arr;
          },
          getEachFilterCount: function (filter) {
            if(filter.selected.length > 0) return filter.selected.length;
          },
          removeFilter: function (filter,i,type="text"){
            if(type === 'text') {
              const index = filter.selected.indexOf(i);
              if (index > -1) filter.selected.splice(index, 1);
            }
            else if(type === 'numeric'){
              let index1 = -1;
              filter.selected.forEach(x=>{
                if(i[0] === x[0] && i[1] === x[1]){
                  index1 = filter.selected.indexOf(x);
                }
              });
              if(index1 > -1) filter.selected.splice(index1,1);
            }
            this.$emit('applyFilter',filter.selected);
          },
          pushFilter: function (){
            this.$emit('applyFilter');
          },
          filterAnalytics: function (pos, fName, fVal) {
            if (fVal !== false) {
              ga.recordFilterEvent(pos, `${fName} : ${fVal}`);
            }
          },
          getSelectedCount: function (selected, filter) {
                let cat = undefined;
                if (filter.field !== 'discounted_price') {
                    cat = filter.values.find(y => y.name === selected);
                } else if (filter.field === 'discounted_price') {
                    cat = filter.values.find(y => {
                        if (y.min === selected[0] && y.max === selected[1]) {
                            return y;
                        }
                    });
                }

                if (cat !== undefined)
                    return cat.count;
                else
                    return 0

            },

            getNotSelectedFilters: function (custom_filters) {

                if (this !== undefined) {

                    let filteredValue = custom_filters.values;

                    if (custom_filters.field !== 'discounted_price') {

                        custom_filters.selected.forEach(s => {
                            filteredValue = filteredValue.filter(y => y.name !== s);
                        });
                    } else if (custom_filters.field === 'discounted_price') {

                        custom_filters.selected.forEach(s => {
                            filteredValue = filteredValue.filter(y => {
                                if (y.min !== s[0] && y.max !== s[1] && y.count > 0) {
                                    return y;
                                }
                            })
                        });
                    }
                    return filteredValue
                }
            },
          /*eslint-disable */

          getColorName: function (cat) {
                switch (cat) {
                    case "Navy Blue":
                        return "navy";
                        break;
                    case "D.Grey":
                        return "#3b3b3b";
                        break;
                    case "Black":
                        return "#000000";
                        break;
                    case "Mustard":
                        return "#FDD451";
                        break;
                    case "Lime":
                        return "#BFFF00";
                        break;
                    case "Natural":
                        return "#ae4a60";
                        break;
                    case "Nude":
                        return "#E3BC9A";
                        break;
                    case "Off White":
                        return "#f5f5f5";
                        break;
                    case "Olive":
                        return "#808000";
                        break;
                    case "Rose":
                        return "#c21e56";
                        break;
                    case "Rust":
                        return "#b7410e";
                        break;
                    case "Taupe":
                        return "#483C32";
                        break;
                    case "Turquiose":
                        return "#40E0D0";
                        break;
                    case "Steel":
                        return "#43464B";
                        break;
                    case "Teal":
                        return "#008080";
                        break;
                    case "Bronze":
                        return "#cd7f32";
                        break;
                    case "Burgundy":
                        return "#800020";
                        break;
                    case "Champagne":
                        return "#F7E7CE";
                        break;
                    case "Charcoal":
                        return "#36454F";
                        break;
                    case "Coral":
                        return "#FF7F50";
                        break;
                    case "Mauve":
                        return "#E0B0FF";
                        break;
                    case "Gnmetal":
                        return "#3b3b3b";
                        break;
                    case "L.Grey":
                        return "#a2a4a3";
                        break;
                    case "N.Blue" :
                        return "#002750";
                        break;
                    case "Camel" :
                        return "#c19a6b";
                        break;
                    case "Cherry" :
                        return "#c20041";
                        break;
                    case "Dark Brown" :
                        return "#541919";
                        break;
                    case "D.Green" :
                        return "#003d0e";
                        break;
                    case "S.Blue" :
                        return "#85d4ff";
                        break;
                    case "S.Green" :
                        return "#00804a";
                        break;
                    case "L.Green" :
                        return "#5dff5f";
                        break;
                    case "P.Green" :
                        return "#1a6c00";
                        break;
                    case "S.Blue" :
                        return "#8b8b8b";
                        break;
                    case "L.Brown" :
                        return "#a47400";
                        break;
                    case "R.Blue" :
                        return "#004280";
                        break;
                    case "T.Blue" :
                        return "#0000ff";
                        break;
                    case "Magenta" :
                        return "#b7006c";
                        break;
                    case "Lemon" :
                        return "#c7f000";
                        break;
                    case "Ofwhite" :
                        return "#fff3c9";
                        break;
                    case "D.Brown" :
                        return "#4c2b11";
                        break;
                    case "L.Beige" :
                        return "#ffe0d5";
                        break;
                    case "D.Beige" :
                        return "#fff0d5";
                        break;
                    case "Olive G" :
                        return "#556b2f";
                        break;
                    case "Ol Green" :
                    case "Olive Green" :
                        return "#008000";
                        break;
                    case "Black" :
                        return "#000000";
                        break;
                    case "Tan" :
                        return "#d2b48c";
                        break;
                    case "Brown" :
                        return "#a52a2a";
                        break;
                    case "White" :
                        return "#FFFFFF";
                        break;
                    case "Wine" :
                        return "#722f37";
                        break;
                    case "Teek" :
                        return "#ae8f60";
                        break;
                    case "Green" :
                        return "#008000";
                        break;
                    case "Red" :
                        return "#f80004";
                        break;
                    case "Dark Grey" :
                        return "#3b3b3b";
                        break;
                    case "Light Beige" :
                        return "#ffdddd";
                        break;
                    case "Elephnt" :
                        return "#001506";
                        break;
                    case "Bordo" :
                        return "#5f021f";
                        break;
                    case "Orange" :
                        return "#ffa600";
                        break;
                    case "Olgreen" :
                        return "#638c00";
                        break;
                    case "Beige" :
                        return "#f5f5dc";
                        break;
                    case "Yellow" :
                        return "#ffff00";
                        break;
                    case "Blue" :
                        return "#0000ff";
                        break;
                    case "Voilet" :
                        return "#b05aff";
                        break;
                    case "Pink" :
                        return "#ffc0cb";
                        break;
                    case "Maroon" :
                        return "#800000";
                        break;
                    case "Red" :
                        return "#ff0000";
                        break;
                    case "Grey" :
                        return "#808080";
                        break;
                    case "Cream" :
                        return "#fffdd0";
                        break;
                    case "Gold" :
                        return "#d4af37";
                        break;
                    case "Copper" :
                        return "#7a4012";
                        break;
                    case "Peach" :
                        return "#ffdab9";
                        break;
                    case "Purple" :
                        return "#800080";
                        break;
                    case "Khaki" :
                        return "Khaki";
                        break;
                    case "Silver" :
                        return "#c0c0c0";
                        break;
                    case "Ecru" :
                        return "#C2B280";
                        break;
                    default :
                        return "#e9e9e9";
                        break;
                }
            },
            numberWithComa: function (number) {
                //let num = number.toFixed(2);
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },


        },
        computed:{
            isDeviceMobile: function () {
                return window.matchMedia("only screen and (max-width: 834px)").matches;
            }
        }
    }
</script>

<style scoped>

</style>

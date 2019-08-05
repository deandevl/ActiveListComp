<template>
  <div class="demo_container">
    <section class="components_box">
      <active-list-comp
          title="My Favorite Fruits"
          placeholder="Enter a fruit"
          :input_size="input_size_fruit"
          :css_variables="css_variables_fruits"
          v-on:active_list_comp_items="show_fruit_items">
      </active-list-comp>

      <active-list-comp
          title="My Hobbies"
          placeholder="Enter a hobby"
          :input_size="input_size_hobby"
          :css_variables="css_variables"
          v-on:active_list_comp_items="show_hobby_items">
      </active-list-comp>
    </section>
    <section class="pbox">
      <p>
        rownwnn andlle  aljnd;3e; .akdnend  qnfdslns alne. andl;; irjlsek  sljdnel
        ewlnsl lsnkei s nelnsndl  slhelnskdn lslsn; a;ke;;;0ekd  lsnlsnel sllls
        2nwlenkf lsmksnel; slasll slenen ls nellllsn 5nrlnelwn lsnl  slnwnl  rien
        wqnelnwlen tltnylnr lsnenl wqnsna slns yktnu iims wemr eeenelsn ssysnwl snn
        rlrnelwn lsnen  rlnelwn alqnfkt ndlnwln eerlnw qnerndlsnl yytl alsn lkd5lr
        endsbx alnsnr uyntlrnl lln wndjf prpt wenrnf qwns duu tnrhdhh slnfldn wekr
      </p>
    </section>
  </div>
</template>

<script>
  import ActiveListComp from 'activelistcomp';

  export default {
    name: "App",
    data() {
      return {
        input_size_fruit: 24,
        input_size_hobby: 40,
        css_variables_fruits: {
          active_list_items_panel_background: 'lightgreen',
          active_list_panel_position: 'absolute',
          active_list_panel_z_index: '100'
        },
        css_variables: {
          active_list_items_panel_background: 'lightblue'
        }
      };
    },
    components: {
      ActiveListComp
    },
    methods: {
      //functions that respond to 'active_list_comp_items' events
      show_fruit_items: function(items) {
        console.log(`Fruit Items: ${items}`);
      },
      show_hobby_items: function(items){
        console.log(`Hobby Items: ${items}`);
      }
    }
  }
</script>

<style>
  .demo_container {
    display: flex;
    flex-direction: column;
    padding: 50px;
  }
  .components_box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 800px;
    margin-top: 60px;
  }
  .pbox {
    margin-top: 40px;
  }
</style>
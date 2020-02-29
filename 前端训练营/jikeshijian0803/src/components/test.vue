<template>
  <div class="app-container">

 <div class="filter-container">
 搜索栏
 </div>
<div class="filter-container">
  <br>
<el-tag type="danger">内容板块</el-tag>

</div> 

  </div>
</template>

<script>
export default {
components: {  },
  name: "test",

  data() {
    return {    
      userID: 0,
      dialogStatus: "create",    
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: null,
        type: undefined,
     
      },
    };
  },
  created() {
   
  },
   watch: {
    userID: function() {
       if (this.userID == 0)
   { this.resetTemp()}
   else
   {
     
    }}
  },

   props: {
    userID: {
      type: Number,
      default: 0
    },
    dialogStatus: {
      type: String,
      default: "create"
    }
  },
  methods: {

    getList() {

   
     
    },

  
  }
};
</script>

<style>

</style>

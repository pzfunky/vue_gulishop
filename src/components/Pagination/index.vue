<template>
    <div class="pagination">
        <!-- 上一页不是一直都能点击,当前页是第一页时应该要禁用不能点击 -->
        <button :disabled="currentPageNo === 1" @click="$emit('changePageNo',currentPageNo - 1)">上一页</button>
        <!-- 这个1也不是一直显示, 因为后面我们会显示连续页码,如果连续页面刚好就是1-5,那么这个1就不要了-->
        <button v-if="startEnd.start > 1" @click="$emit('changePageNo',1)">1</button>
        <!-- 三点也不是一直显示,当start大于2时,这三个点永远显示 -->
        <button v-if="startEnd.start > 2">···</button>

        <!-- 这里显示连续页 -->
        <!-- vfor还可以遍历一个数字 -->
        <button 
          :class="{active:currentPageNo === page}" 
          v-for="page in startEnd.end" :key="page" 
          v-if="page >= startEnd.start"
          @click="$emit('changePageNo',page)"
        >{{page}}</button>
        
        
        <!-- 这三个点也不是一直显示,end小于totalPageNo, 这三个点永远显示-->
        <button v-if="startEnd.end < totalPageNo - 1">···</button>
        <button v-if="startEnd.end < totalPageNo" @click="$emit('changePageNo',totalPageNo)">{{totalPageNo}}</button>
        <button :disabled="currentPageNo === totalPageNo" @click="$emit('changePageNo',currentPageNo + 1)">下一页</button>
        
        <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:{
      currentPageNo:Number,
      total:{
        type:Number,
        default:0
      },
      pageSize:{
        type:Number,
        default:10
      },
      continueNo:{
        type:Number,
        required:true        
      }
    },
    computed:{
      //计算总页码
      totalPageNo(){
        let {total,pageSize} = this
        return Math.ceil(total/pageSize)
      },

      //计算连续页的起始位置和结束位置
      startEnd(){
        let {continueNo,currentPageNo,totalPageNo} = this
        let start = 0
        let end = 0

        if(continueNo >= totalPageNo){
          //假设传递的连续页数比最大页数还要大,代表根本没有连续页
          start = 1,
          end = totalPageNo
        }else{
          //正常情况
          start = currentPageNo - Math.floor(continueNo/2)
          end = currentPageNo + Math.floor(continueNo/2)

          //非正常情况
          if(start <= 0){
            //在左侧非正常情况,需要把计算的start和end修正一些
            start = 1
            end = continueNo
          }
          if(end >= totalPageNo){
            //在右侧非正常情况,需要把计算的start和end修正一些
            start = totalPageNo - continueNo + 1
            end = totalPageNo
          }
        }
        return {start,end}
      }

    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      // background-color: #fff;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>

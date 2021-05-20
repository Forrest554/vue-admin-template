<template>
  <div class="dashboard-container">
    <div class="dashboard-text">用户信息</div>
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="role" label="角色" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { _getAllUser } from "@/api/adminAPI.js";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      userList: [],
    };
  },
  methods: {
    getAllUser() {
      _getAllUser().then((res) => {
        this.userList = res.data;
      });
    },
  },
  mounted() {
    this.getAllUser();
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

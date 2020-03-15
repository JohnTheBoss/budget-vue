<template>
  <div>
    <div class="navbar">
      <nuxt-link to="/">Budget-App</nuxt-link>
      | Hello, {{user.displayName}}!
      <a
        href="javascript:void(0);"
        class="text-white"
        @click="logout()"
      >Logout</a>
    </div>
    <div class="app-content">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <div class="avatar">
              <img :src="user.avatar" :alt="user.displayName+' avatar'" v-if="user.avatar !== null" />
              <template v-else>
                <fa :icon="['far', 'user-circle']" />
              </template>
            </div>
          </div>

          <div class="col-12">
            <div class="box profile-box">
              <div class="box-header">My Profile Data</div>
              <template v-if="!profilDataEdit">
                <div class="box-body">
                  <div class="profile-info">
                    <div class="key">Name</div>
                    <div class="value">{{user.displayName}}</div>
                  </div>

                  <div class="profile-info">
                    <div class="key">Email</div>
                    <div class="value">{{user.email}}</div>
                  </div>
                </div>
                <div class="box-footer mt-3">
                  <button
                    class="btn btn-primary btn-block"
                    @click="profilDataEdit = !profilDataEdit"
                  >Edit</button>
                </div>
              </template>
              <template v-else>
                <div class="box-body">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      class="form-control"
                      v-model="profilData.name"
                      placeholder="Name"
                    />
                  </div>

                  <div class="form-group">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      class="form-control"
                      v-model="profilData.email"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div class="box-footer mt-3">
                  <button class="btn btn-success btn-block" @click="SaveUserData()">Save</button>
                </div>
              </template>
            </div>
          </div>

          <div class="col-12">
            <div class="box profile-box">
              <div class="box-header">Change Profile Image</div>
              <div class="box-body">
                <div class="custom-file">
                  <input
                    type="file"
                    accept="image/*"
                    @change="selectProfileImageInInput($event)"
                    class="custom-file-input"
                    id="profileImage"
                  />
                  <label
                    class="custom-file-label"
                    for="profileImage"
                  >{{profileImage === null ? "Choose file" : profileImage.name }}</label>
                </div>
              </div>
              <div class="box-footer mt-3">
                <button class="btn btn-success btn-block" @click="UploadProfileImage()">Upload</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  middleware: "auth",
  head() {
    return {
      bodyAttrs: {
        class: "main-app"
      }
    };
  },
  components: {},
  data() {
    return {
      profilDataEdit: false,
      profilData: {},
      profileImage: null
    };
  },
  computed: {
    user() {
      const authUser = this.$store.state.auth.authUser;
      this.profilData = {
        name: authUser.displayName,
        email: authUser.email
      };
      return authUser;
    }
  },
  methods: {
    ...mapActions({
      logoutUser: "auth/logoutUser",
      updateUserData: "auth/updateUserData",
      uploadProfileImage: "auth/UploadProfileImage"
    }),

    selectProfileImageInInput(event) {
      if (event.target.files[0] !== undefined) {
        this.profileImage = event.target.files[0];
      } else {
        this.profileImage = null;
      }
    },

    async SaveUserData() {
      try {
        await this.updateUserData(this.profilData).then(data => {
          console.log(data);
          this.profilDataEdit = false;
        });
      } catch (e) {
        alert(e);
      }
    },

    async UploadProfileImage() {
      try {
        this.uploadProfileImage(this.profileImage);
      } catch (error) {
        alert(error);
      }
    },

    async logout() {
      try {
        await this.logoutUser().then(() => {
          this.$router.push("/auth/login");
        });
      } catch (e) {
        alert(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  margin-bottom: 1em;
  height: 4em;
  width: 4em;
  display: inline-block;
  text-align: center;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }

  svg {
    font-size: 4em;
  }
}
</style>

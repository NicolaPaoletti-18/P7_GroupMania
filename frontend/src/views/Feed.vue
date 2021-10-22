<!-- VIEW FEED - Page principale avec la navigation, la création et les posts -->

<template>
  <div>
    <!-- Alert si l'user est non connecté -->
    <Alert
      v-if="!connected"
      :alertType="alert.type"
      :alertMessage="alert.message"
    />
    <!-- Fin -->
    <div v-else>
      <!-- Navigation -->
      <NavFeed />
      <!-- Fin -->
      <!-- Création des posts -->
      <CreatePost v-on:post-sent="post" />
      <!-- Fin -->
      <!-- Alert pour la création et suppression des posts -->
      <Alert
        v-if="alert.active && !alert.activeComment"
        :alertType="alert.type"
        :alertMessage="alert.message"
      />
      <!-- Fin -->

      <!-- Post -->
      <Post
        v-for="post in posts"
        :key="post.postID"
        :idPost="post.postID"
        :idUser="post.userID"
        v-on:d-comment-input="dCommentInput(post.postID)"
        v-on:reaction-down="sendReaction(post.postID, -1)"
        v-on:reaction-up="sendReaction(post.postID, 1)"
        v-on:reaction-none="sendReaction(post.postID, 0)"
        :reaction="post.yourReaction"
      >
        <!-- Bouton de suppréssion du post -->
        <template v-slot:postDelete v-if="userIsAdmin == true">
          <i
            class="fas fa-times"
            aria-hidden="true"
            title="Supprimer le post"
            role="button"
            v-on:click="deletePost(post.postID)"
          ></i>
          <span class="sr-only">Supprimer le post</span>
        </template>
        <template v-slot:postDelete v-else-if="post.yourPost > 0">
          <i
            class="fas fa-times"
            aria-hidden="true"
            title="Supprimer le post"
            role="button"
            v-on:click="deletePost(post.postID)"
          ></i>
          <span class="sr-only">Supprimer le post</span>
        </template>
        <!-- Fin -->

        <!-- Afficher les images (gif, jpg, jpeg) dans les posts -->
        <template
          v-slot:postGif
          v-if="
            post.gifUrl.includes('.gif') ||
              post.gifUrl.includes('.jpg') ||
              post.gifUrl.includes('.jpeg')
          "
        >
          <img
            :src="post.gifUrl"
            class="card-img gif-img"
            alt="Image du post"
          />
        </template>
        <!-- Fin -->

        <!-- Afficher les vidéos (mp4) dans les posts -->
        <template v-slot:postGif v-else-if="post.gifUrl.includes('.mp4')">
          <video width="100%" controls>
            <source :src="post.gifUrl" type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        </template>
        <!-- Fin -->

        <!-- User -->
        <template v-slot:userAvatar>
          <img
            :src="post.avatarUrl"
            class="card-img avatar rounded-circle mr-1"
            alt="Avatar de l'utilisateur"
          />
        </template>
        <template v-slot:userName>{{
          post.firstName + " " + post.lastName
        }}</template>
        <template v-slot:userPseudo v-if="post.pseudo !== null">{{
          "@" + post.pseudo
        }}</template>
        <!-- Fin -->
        <!-- Corps du post -->
        <template v-slot:postLegend>{{ post.legend }}</template>
        <!-- Fin -->
        <!-- Création d'un commentaire -->
        <template v-slot:createComment>
          <CreateComment
            v-on:comment-sent="updateBody"
            v-if="commentInputShow && commentID === post.postID"
          >
            <button
              class="btn btn-light form-control text-center"
              type="submit"
              v-on:click.prevent="postComment(post.postID)"
            >
              Publier
            </button>
          </CreateComment>
          <Alert
            v-if="
              alert.active && alert.activeComment && commentID === post.postID
            "
            :alertType="alert.type"
            :alertMessage="alert.message"
          />
        </template>
        <!-- Fin -->
        <!-- Footer post -->
        <template v-slot:postDate>{{ post.dateCreation }}</template>
        <template v-slot:postUp>{{ post.countUp }}</template>
        <template v-slot:postDown>{{ post.countDown }}</template>
        <!-- Fin -->
      </Post>
      <!-- Fin -->
    </div>
  </div>
</template>

<script>
import NavFeed from "@/components/NavFeed.vue";
import Post from "@/components/Post.vue";
import Alert from "@/components/Alert.vue";
import CreatePost from "@/components/CreatePost.vue";
import CreateComment from "@/components/CreateComment.vue";
export default {
  name: "Feed",
  components: {
    NavFeed,
    Post,
    Alert,
    CreatePost,
    CreateComment,
  },
  data: () => {
    return {
      connected: true, // Défini si l'user est connecté
      alert: {
        active: false, // Défini si l'alerte doit être montré
        activeComment: false, // Défini si l'alerte concerne un commentaire
        type: "",
        message: "",
      },
      posts: [], // Stock les posts
      body: "", // Stock le corps du commentaire
      commentInputShow: false, // Défini si l'input de la création de commentaire doit être montré
      commentID: "", // Stock l'id du post pour lequel le commentaire sera envoyé
      userIsAdmin: false,
    };
  },
  methods: {
    alertConstant(type, message) {
      // Crée une alerte
      const dataAlert = this.$data.alert;
      this.connected = false;
      dataAlert.type = type;
      dataAlert.message = message;
    },
    alertActive(type, message) {
      // Crée une alerte pendant 4 secondes
      const dataAlert = this.$data.alert;
      dataAlert.active = true;
      dataAlert.type = type;
      dataAlert.message = message;
      setTimeout(function() {
        dataAlert.active = false;
        dataAlert.activeComment = false;
        dataAlert.type = "";
        dataAlert.message = "";
      }, 4000);
    },
    getUserRole() {
      // Récupère les infos de l'utilisateur
      this.$axios
        .get("user/role")
        .then((data) => {
          if (data.role == "admin") {
            this.userIsAdmin = true;
          }
        })
        .catch((e) => {
          if (e.response.status === 401) {
            this.alertConstant("alert-danger mt-5", "Veuillez vous connecter");
          }
          if (e.response.status === 400) {
            this.alertConstant("alert-warning mt-5", "Utilisateur non trouvé");
          }
          if (e.response.status === 500) {
            this.alertConstant("alert-warning mt-5", "Erreur serveur");
          }
        });
    },
    get() {
      // Récupère les posts
      this.$axios
        .get("post")
        .then((data) => {
          console.log('pass recupere les posts');
          this.posts = data.data;
        })
        .catch((e) => {
          if (e.response.status === 401) {
            this.alertConstant("alert-danger mt-5", "Veuillez vous connecter");
          }
        });
    },
    post(data) {
      // Poste un post
      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("legend", data.legend);
      this.$axios
        .post("post", formData)
        .then(() => {
          this.get();
          console.log("pass post publiè");
          this.alertActive("alert-success", "Post publié !");
        })
        .catch((e) => console.log(e));
    },
    deletePost(postID) {
      // Supprime un post si c'est le notre
      this.$axios
        .delete("post/" + postID)
        .then(() => {
          const indexPost = this.$data.posts
            .map((e) => {
              return e.postID;
            })
            .indexOf(parseInt(postID));
          this.$data.posts.splice(indexPost, 1);
          this.alertActive("alert-warning", "Post supprimé !");
        })
        .catch((e) => console.log(e));
    },
    sendReaction(postID, reaction) {
      // Envois les réactions
      this.$axios
        .post(`post/${postID}/reaction`, { reaction: reaction })
        .then(() => {
          this.get();
        })
        .catch((e) => console.log(e));
    },
    dCommentInput(postID) {
      //Dévoile l'input pour créer un commentaire
      if (this.commentInputShow) {
        this.commentID = postID;
      } else {
        this.commentInputShow = true;
        this.commentID = postID;
      }
    },
    updateBody(data) {
      // Stock le corps du commentaire
      this.body = data.body;
    },
    postComment(postID) {
      // Poste le commentaire
      const formValid = document
        .getElementsByName("formComment")[0]
        .checkValidity();
      if (formValid) {
        this.$axios
          .post(`post/${postID}/comment`, { body: this.body })
          .then(() => {
            this.commentInputShow = false;
            this.alert.activeComment = true;
            this.alertActive("alert-success mt-1", "Commentaire publié !");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
  mounted() {
    // Récupère les posts et défini le titre
    //this.getUserRole();
    this.get();
    document.title = "Fil d'actualité | Groupomania";
  },
};
</script>

<style scoped lang="scss">
.avatar {
  width: 2em;
  height: 2em;
  object-fit: cover;
}
i {
  position: absolute;
  left: 1em;
  top: 1em;
  z-index: 1;
  &:hover {
    color: rgb(233, 68, 38);
  }
}
</style>

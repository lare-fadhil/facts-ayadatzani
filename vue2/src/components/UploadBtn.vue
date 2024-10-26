
        
<template>
<div @drop="handleDrop" @dragover="handleDragOver">
  <input type="file" style="display:none" @change="uploadFile" ref="file" />
  <div>
    <div v-if="isImage && !imageError">
      <v-avatar v-if="isAvatar" class="ma-1" :size="width" @click="previewDialog = true">
        <v-progress-circular v-if="loading" :value="progressPercentage" color="primary"></v-progress-circular>
        <v-img v-else  @error="handleImageError" :src="$imagePath+imgName+'?w='+width+'&h='+height+'?q='+quality" alt="image" />
      </v-avatar>
      <div v-else>
        <v-progress-circular v-if="loading" :value="progressPercentage" color="primary"></v-progress-circular>
        <v-img
          v-else
          contain
          :width="width"
          :height="height"
          @click="previewDialog = true"
          :src="$imagePath+imgName+'?w='+width+'&h='+height+'?q='+quality"
          alt="image"
          @error="handleImageError"
        />
      </div>
    </div>
    <div v-else>
      <v-btn v-if="isAvatar" :loading="loading" @click="$refs.file.click()" color="blue" icon>
        <v-icon>mdi-image</v-icon>
      </v-btn>
      <v-btn v-else :loading="loading" @click="$refs.file.click()" color="primary">
        Tap to Upload Image
        <v-icon right>mdi-image</v-icon>
      </v-btn>
    </div>
  </div>

  <v-dialog v-model="previewDialog" :fullscreen="fullScreenModal" :overlay="false" max-width="500px">
    <v-card v-if="isImage" @drop="handleDropDialog" @dragover="handleDragOverDialog">
      <v-card-title primary-title>
        Image Preview
        <v-spacer></v-spacer>
        <v-btn icon @click="fullScreenModal = !fullScreenModal">
          <v-icon>
            {{ fullScreenModal ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}
          </v-icon>
        </v-btn>
        <v-btn color="error" icon @click="previewDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-img contain width="100%" height="75vh" :src="$imagePath+imgName" alt="image" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mx-2" @click="$refs.file.click()">
          Change Image
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
</div>
</template>

<script>
import axios from 'axios';

export default {
data() {
  return {
    loading: false,
    previewDialog: false,
    fullScreenModal: false,
    uploadingDialog: false,
  progressPercentage: 0,
  imageError: false
  };
},
props: {
  table: {
    type: Object,
    required: true
  },
  isImage: {
    type: Boolean,
    required: true
  },
  imgName: {
    type: String,
    required: true
  },
  isAvatar: {
    type: Boolean,
    required: false,
    default: true
  },
  width: {
    type: Number,
    required: false,
    default: 50
  },
  height: {
    type: Number,
    required: false,
    default: 50
  },
  quality: {
    type: Number,
    required: false,
    default: 100
  }
},
methods: {
  handleImageError() {
  this.imageError = true;

},
  uploadFile($event) {
    var formData = new FormData();
    formData.append('table_name', this.table.table_name);
    formData.append('column_name', this.table.column_name);
    formData.append('table_key', this.table.table_key);
    formData.append('table_key_value', this.table.table_key_value);
    formData.append('file', $event.target.files[0]);
    this.loading = true;
    this.uploadingDialog = true;
    axios
      .post('/config/update-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        this.progressPercentage = progress;
      }
      })
      .then((response) => {
        this.loading = false;
        this.uploadingDialog = false;
        this.$emit('uploaded', response.data);
      })
      .catch((error) => {
        this.loading = false;
        this.uploadingDialog = false;
        console.log(error);
      });
  },
  handleDrop($event) {
    $event.preventDefault();
    const file = $event.dataTransfer.files[0];
    this.uploadFile({ target: { files: [file] } });
  },
  handleDragOver($event) {
    $event.preventDefault();
  },
  handleDropDialog($event) {
    $event.preventDefault();
    const file = $event.dataTransfer.files[0];
    this.uploadFile({ target: { files: [file] } });
  },
  handleDragOverDialog($event) {
    $event.preventDefault();
  }
}
};
</script>
  
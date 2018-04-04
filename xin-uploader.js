import { define, Component } from '@xinix/xin';

import '@xinix/xin/components/for';
import './xin-uploader.css';

const { fetch } = window;

export class XinUploader extends Component {
  get template () {
    return require('./xin-uploader.html');
  }

  get props () {
    return Object.assign({}, super.props, {
      value: {
        type: Array,
        value: () => ([]),
        notify: true,
      },

      accept: {
        type: String,
        value: '*/*',
      },

      multiple: {
        type: Boolean,
      },

      url: {
        type: String,
        value: '',
      },
    });
  }

  async fileSelected (evt) {
    let files = Array.from(evt.target.files).map(file => {
      file.isUploading = Boolean(this.url);
      this.push('value', file);
      return file;
    });

    if (this.url) {
      let form = new FormData();
      files.forEach(file => {
        form.append('file', file);
      });
      let fetchOpts = {
        method: 'POST',
        body: form,
      };
      let resp = await fetch(this.url, fetchOpts);
      let remoteFiles = await resp.json();

      let valueFiles = this.value;
      this.set('value', []);

      valueFiles = valueFiles.map(file => {
        if (file instanceof File === false) {
          return file;
        }

        let rf = remoteFiles.find(rf => rf.name === file.name);
        rf.isUploading = false;

        return rf;
      });

      this.set('value', valueFiles);
    }


    evt.target.value = '';
  }

  deleteClicked (evt) {
    evt.preventDefault();
    let index = this.$.uploaderFor.indexForElement(evt.target);
    if (typeof index !== 'number') {
      return;
    }
    this.splice('value', index, 1);
  }
}

define('xin-uploader', XinUploader);

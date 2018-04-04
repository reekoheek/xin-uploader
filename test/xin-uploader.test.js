import assert from 'assert';
import Fixture from '@xinix/xin/components/fixture';
import '..';

describe('xin-uploader', () => {
  it('show dropzone and no file', async () => {
    let fixture = Fixture.create(`<xin-uploader url="http://localhost:3000/upload" multiple></xin-uploader>`);
    await fixture.waitConnected();
    let uploader = fixture.$$('xin-uploader');
    assert(uploader.getAttribute('xin-id'));
    assert.equal(uploader.multiple, true);
    assert.equal(uploader.url, 'http://localhost:3000/upload');

    assert(uploader.$.uploaderDropzone);
    assert.equal(uploader.querySelectorAll('.uploader-file').length, 0);
  });

  it('show bootstrapped files', async () => {
    let fixture = Fixture.create(`<xin-uploader multiple value='[{"serverName":"foo"},{"serverName":"bar"}]'></xin-uploader>`);
    await fixture.waitConnected(300);
    let uploader = fixture.$$('xin-uploader');
    assert.equal(uploader.querySelectorAll('.uploader-file').length, 2);
  });
});

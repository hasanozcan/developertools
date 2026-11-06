'use strict';
const status = document.getElementById('status');
async function post(path, data) {
  const response = await fetch(path, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'unavailable');
  return result;
}
async function start() {
  try {
    const config = await fetch('/rafi/account-api/config').then(response => { if (!response.ok) throw new Error('unavailable'); return response.json(); });
    const challenge = await post('/rafi/account-api/challenge', {});
    if (!window.google || !window.google.accounts) throw new Error('google_unavailable');
    window.google.accounts.id.initialize({client_id:config.clientId,nonce:challenge.nonce,callback:async function (credential) {
      if (!window.confirm('Oyun hesabın ve bulut ilerlemen kalıcı olarak silinecek. Devam edilsin mi?')) { status.textContent='Silme işlemi iptal edildi. Sayfayı yenileyerek yeniden deneyebilirsin.'; return; }
      try {
        await post('/rafi/account-api/delete-google', {idToken:credential.credential,nonce:challenge.nonce,confirm:'DELETE'});
        status.textContent='Oyun hesabın ve bulut ilerlemen silindi.';
        document.getElementById('google-button').hidden=true;
      } catch (_) { status.textContent='İşlem tamamlanamadı. Sayfayı yenileyip tekrar dene.'; }
    }});
    window.google.accounts.id.renderButton(document.getElementById('google-button'),{theme:'outline',size:'large',text:'signin_with'});
    status.textContent='Silinecek oyun hesabıyla giriş yap.';
  } catch (_) { status.textContent='Google doğrulaması yüklenemedi. İnternet bağlantını kontrol edip sayfayı yenile.'; }
}
if (document.readyState === 'complete') void start(); else window.addEventListener('load',start,{once:true});

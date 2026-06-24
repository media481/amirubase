    (async () => {
        initInfoBar();
        await loadUserRoles();
        await loadJadwal();
        renderJadwalSection();
        await loadKbJamaah();
        await loadFeaturedIds();
        await loadDataFromSupabase();
        // Cek & kirim pengingat program ≤ 30 hari setelah data loaded
        setTimeout(() => checkAndSendReminders(), 2000);
    })();
</script>
<!-- DELETE CONFIRM MODAL -->
<style>
.delete-confirm-modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:40000;overflow-y:auto;padding:24px;backdrop-filter:blur(4px);}
.delete-confirm-modal.show{display:flex;align-items:center;justify-content:center;}
.delete-confirm-box{max-width:440px;width:100%;background:#fff;border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-lg);animation:modalFadeIn .25s ease;}
.delete-confirm-header{background:linear-gradient(135deg,#dc2626,#b91c1c);color:#fff;padding:18px 22px;display:flex;align-items:center;gap:12px;}
.delete-confirm-header i{font-size:20px;}
.delete-confirm-header h3{font-size:16px;font-weight:700;margin:0;}
.delete-confirm-body{padding:22px;}
.delete-confirm-warning{background:#fef2f2;border:1px solid #fecaca;border-radius:var(--radius);padding:14px 16px;margin-bottom:18px;display:flex;gap:12px;align-items:flex-start;}
.delete-confirm-warning i{color:#dc2626;font-size:16px;margin-top:1px;flex-shrink:0;}
.delete-confirm-warning p{font-size:13px;color:#7f1d1d;line-height:1.5;margin:0;}
.delete-confirm-warning strong{display:block;margin-bottom:4px;font-size:13.5px;}
.delete-confirm-prog-name{background:#f8fafc;border:1px solid var(--border);border-radius:6px;padding:10px 14px;font-size:13.5px;font-weight:700;color:var(--text-1);margin-bottom:16px;word-break:break-word;}
.delete-confirm-label{font-size:12px;font-weight:700;color:var(--text-2);text-transform:uppercase;letter-spacing:.4px;margin-bottom:6px;}
.delete-confirm-input{width:100%;padding:10px 12px;border:1.5px solid var(--border);border-radius:6px;font-size:13px;font-family:inherit;color:var(--text-1);transition:border-color var(--transition);}
.delete-confirm-input:focus{outline:none;border-color:#dc2626;box-shadow:0 0 0 2px rgba(220,38,38,0.1);}
.delete-confirm-actions{display:flex;gap:8px;margin-top:18px;}
.delete-confirm-btn-cancel{flex:1;padding:10px;border-radius:6px;font-size:13px;font-weight:700;border:1px solid var(--border);background:#fff;color:var(--text-2);cursor:pointer;transition:all var(--transition);}
.delete-confirm-btn-cancel:hover{background:var(--surface2);}
.delete-confirm-btn-hapus{flex:1;padding:10px;border-radius:6px;font-size:13px;font-weight:700;border:none;background:#dc2626;color:#fff;cursor:pointer;transition:all var(--transition);display:flex;align-items:center;justify-content:center;gap:6px;}
.delete-confirm-btn-hapus:hover:not(:disabled){background:#b91c1c;}
.delete-confirm-btn-hapus:disabled{opacity:.4;cursor:not-allowed;}
</style>
<!-- POSTER HOVER POPUP -->
<div id="posterPopup">
    <div class="poster-popup-inner">
        <div class="poster-popup-img-wrap">
            <div class="poster-popup-loading" id="posterPopupLoading">
                <i class="fas fa-spinner"></i>
                <span>Memuat poster...</span>
            </div>
            <div class="poster-popup-error" id="posterPopupError">
                <i class="fas fa-image-slash"></i>
                <span>Gagal memuat poster</span>
            </div>
            <img id="posterPopupImg" src="" alt="Poster" style="display:none;" 
                onload="document.getElementById('posterPopupLoading').style.display='none';this.style.display='block';"
                onerror="document.getElementById('posterPopupLoading').style.display='none';document.getElementById('posterPopupError').style.display='flex';this.style.display='none';">
        </div>
        <div class="poster-popup-label"><i class="fas fa-image"></i> <span id="posterPopupName"></span></div>
    </div>
</div>

<div id="deleteConfirmModal" class="delete-confirm-modal">
    <div class="delete-confirm-box">
        <div class="delete-confirm-header">
            <i class="fas fa-triangle-exclamation"></i>
            <h3>Hapus Program Umroh</h3>
        </div>
        <div class="delete-confirm-body">
            <div class="delete-confirm-warning">
                <i class="fas fa-circle-exclamation"></i>
                <p><strong>Tindakan ini tidak dapat dibatalkan!</strong>Program akan dihapus permanen dari database dan tidak bisa dipulihkan.</p>
            </div>
            <div class="delete-confirm-label">Program yang akan dihapus</div>
            <div class="delete-confirm-prog-name" id="deleteConfirmProgName"></div>
            <div class="delete-confirm-label">Ketik nama program untuk konfirmasi</div>
            <input type="text" class="delete-confirm-input" id="deleteConfirmInput" placeholder="Ketik nama program di sini..." oninput="onDeleteConfirmInput()">
            <div class="delete-confirm-actions">
                <button class="delete-confirm-btn-cancel" onclick="closeDeleteConfirmModal()"><i class="fas fa-xmark"></i> Batal</button>
                <button class="delete-confirm-btn-hapus" id="deleteConfirmBtn" onclick="confirmDeleteProgram()" disabled><i class="fas fa-trash"></i> Hapus Permanen</button>
            </div>
        </div>
    </div>
</div>

</body>
</html>

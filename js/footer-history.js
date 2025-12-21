(async function(){
  // Footer UI உருவாக்கம்
  const footer = document.createElement('div');
  footer.id = 'tq-footer';
  footer.innerHTML = `
    <div>📚 மொத்த தொகுப்புகள்: <strong id="quizCount">..</strong> | 
    புதுப்பிக்கப்பட்டது: <strong id="tq-lastupdate">..</strong></div>
    <button id="tq-refresh">🔄 புதுப்பிக்க</button>
    <button id="tq-home" onclick="location.href='index.html'">🏠 முகப்பு</button>
    <button id="showScores">📊 வரலாறு</button>`;
  document.body.appendChild(footer);

  const style = document.createElement('style');
  style.textContent = `
    #tq-footer { position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #ddd;text-align:center;padding:8px;font-size:0.85rem;z-index:999; }
    #tq-footer button { margin:2px; padding:5px 10px; border-radius:4px; border:none; cursor:pointer; font-weight:bold; color:white; }
    #tq-refresh { background:#28a745; } #tq-home { background:#007bff; } #showScores { background:#fd7e14; }
  `;
  document.head.appendChild(style);

  // புள்ளிவிவரங்களைப் பெறுதல்
  try {
    const res = await fetch('quiz-list.json', { cache: 'no-cache' });
    const list = await res.json();
    let totalQuizzes = 0;
    list.forEach(c => totalQuizzes += c.quizzes.length);
    document.getElementById('quizCount').textContent = totalQuizzes;
    document.getElementById('tq-lastupdate').textContent = new Date().toLocaleDateString('ta-IN');
  } catch(e) { console.log("Footer update failed"); }

  document.getElementById('tq-refresh').onclick = () => location.reload();

  document.getElementById('showScores').onclick = function(){
    const user = JSON.parse(localStorage.getItem('quizUser'));
    if(!user) { alert("தயவுசெய்து முதலில் உள்நுழையவும்!"); return; }
    
    const history = JSON.parse(localStorage.getItem('quizHistory_' + user.name)) || [];
    let html = `<h3>📊 ${user.name} -ன் பயிற்சி வரலாறு</h3>`;
    
    if(history.length === 0) {
      html += "<p>தகவல்கள் ஏதுமில்லை.</p>";
    } else {
      html += `<table border='1' style='width:100%; border-collapse:collapse; font-size:14px;'>
                <tr style='background:#f2f2f2;'><th>தேதி</th><th>தலைப்பு</th><th>மதிப்பெண்</th></tr>`;
      history.forEach(r => {
        html += `<tr><td>${r.date}</td><td>${r.title}</td><td>${r.score}/${r.total} (${r.percentage}%)</td></tr>`;
      });
      html += `</table>`;
    }
    const w = window.open("", "_blank", "width=500,height=400");
    w.document.write(`<html><head><title>மதிப்பெண்கள்</title></head><body style='font-family:sans-serif; padding:20px;'>${html}</body></html>`);
  };
})();

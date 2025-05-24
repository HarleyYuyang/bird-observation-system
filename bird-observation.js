// 检查鸟类是否已被观测
function checkBirdObservation(birdId) {
    return localStorage.getItem(`bird_observation_${birdId}`) !== null;
}

// 跳转到观测记录页面
function goToObservationPage(birdId, birdName) {
    window.location.href = `observation.html?id=${birdId}&name=${encodeURIComponent(birdName)}`;
}

// 为所有鸟类项目添加点击事件和观测提示
function initializeBirdItems() {
    // 获取所有鸟类项目
    const birdItems = document.querySelectorAll('.suggestion-item');
    
    birdItems.forEach(item => {
        const birdName = item.textContent.trim();
        const birdId = birdName.replace(/\s+/g, '_').toLowerCase(); // 使用鸟类名称作为ID
        
        // 检查是否已观测
        if (checkBirdObservation(birdId)) {
            // 添加观测提示
            const observedBadge = document.createElement('span');
            observedBadge.className = 'observed-badge';
            observedBadge.textContent = '已观测';
            observedBadge.style.cssText = `
                background-color: #4CAF50;
                color: white;
                padding: 2px 6px;
                border-radius: 3px;
                font-size: 12px;
                margin-left: 8px;
                display: inline-block;
                vertical-align: middle;
            `;
            item.appendChild(observedBadge);
        }
        
        // 添加点击事件
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            goToObservationPage(birdId, birdName);
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initializeBirdItems);

// 监听搜索框变化，重新初始化鸟类项目
const searchInput = document.getElementById('search');
if (searchInput) {
    searchInput.addEventListener('input', () => {
        // 等待DOM更新后重新初始化
        setTimeout(initializeBirdItems, 100);
    });
} 
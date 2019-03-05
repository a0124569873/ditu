
/**
 * 格式化时间戳为多久之前
 * @param {time} time 时间戳 单位 秒
 */
export function formatTime(time) {
    time = time * 1000;
    const d = new Date(time);
    const now = Date.now();

    const diff = (now - d) / 1000;

    if (diff < 30) {
        return "刚刚";
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + "分钟前";
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + "小时前";
    } else if (diff < 3600 * 24 * 30) {
        return Math.ceil(diff / (3600 * 24)) + "天前";
    } else if (diff < 3600 * 24 * 365) {
        return Math.ceil(diff / (3600 * 24 * 30) ) + "月前";
    } else{
        return Math.ceil(diff / (3600 * 24 * 365) ) + "年前";
    }
}

export function toLocalStr(time){
    let date = new Date(time)
    return date.toLocaleString()
}


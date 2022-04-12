

export default function DisplayNotification(senderId, type) {
    let action;
    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
        <div>
             <span className="notification">{`${senderId} ${action} your post.`}</span>
        </div>
    )
}

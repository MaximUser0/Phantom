import React from "react";
import image from "../assets/img/forum_image.png";

export default function Forums() {
    const [forum, setForum] = React.useState({
        title: "Название форума",
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut enim ligula. Morbi et commodo risus. Curabitur lacinia metus mi, non convallis augue ultrices et. Praesent pellentesque dolor vitae tellus elementum, a luctus augue pretium. Curabitur non nulla metus. Nam accumsan massa nec pulvinar luctus. Fusce vel sem hendrerit, posuere massa sit amet, porta enim. Praesent ut neque sagittis, interdum felis sed, sollicitudin nunc. Sed mollis viverra molestie. Cras vestibulum at sapien sit amet sollicitudin. Cras molestie odio vitae mollis convallis. Morbi sit amet nisl porttitor ligula facilisis facilisis eget in orci. Ut eget pulvinar velit. Sed mollis lectus eu lacinia facilisis. Praesent in sem neque. Curabitur consequat vehicula sapien, non dignissim est convallis a. Vivamus volutpat vel sapien non mattis. Nulla malesuada pellentesque sem. Sed suscipit maximus sapien, vitae imperdiet felis laoreet non. Morbi elementum molestie velit, sit amet convallis tellus varius quis. Sed molestie luctus tincidunt. Suspendisse cursus vulputate tellus, consectetur fermentum dolor lobortis vitae. Donec elementum condimentum quam ac laoreet. Nullam ultrices mauris elit, sit amet faucibus lorem sagittis id. 
            <br/>Suspendisse cursus vulputate tellus, consectetur fermentum dolor lobortis vitae. Donec elementum condimentum quam ac laoreet. Nullam ultrices mauris elit, sit amet faucibus lorem sagittis id.`,
        images: ["../img/example.png", "../img/example.jpg"],
        comments: [
            {
                owner: "fantom_skitsa",
                image: "../img/example.png",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet tellus sit amet risus vulputate euismod. Nunc molestie urna sit amet enim euismod, non convallis felis tempor. Nam a aliquam massa, in consequat felis. Cras sollicitudin elementum mi, id sollicitudin est. Nulla malesuada cursus augue, non facilisis felis.",
                create_at: "30.03.25",
            },
            {
                owner: "aeaea",
                image: "../img/example.jpg",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet tellus sit amet risus vulputate euismod. Nunc molestie urna sit amet enim euismod, non convallis felis tempor. Nam a aliquam massa, in consequat felis. Cras sollicitudin elementum mi, id sollicitudin est. Nulla malesuada cursus augue, non facilisis felis.",
                create_at: "30.03.25",
            },
        ],
        owner: "fantom_skitsa",
        created_at: "30.03.2025",
        owner_image: "../img/example.png",
    });
    return (
        <div className="Forum">
            <div className="content">
                <h1>{forum.title}</h1>
                <div>
                    <div className="image">
                        <img
                            alt="Изображение создателя форума"
                            src={forum.owner_image}
                        />
                        <p>{forum.created_at}</p>
                        <h2 className="mobile-only">{forum.owner}</h2>
                    </div>
                    <div className="info">
                        <div>
                            <h2 className="desktop-only">{forum.owner}</h2>
                            {forum.content.split("<br/>").map((text, i) => (
                                <p key={"forum-page-text-" + i}>{text}</p>
                            ))}
                            <div>
                                {forum.images.map((src, i) => (
                                    <img
                                        alt="Изображение на форуме"
                                        key={"forum-page-attached-image-" + i}
                                        src={src}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="comments">
                <div className="list">
                    <div>
                        {forum.comments.map((comment, i) => (
                            <div key={"forum-page-comment-" + i}>
                                <div>
                                    <img
                                        alt="Изображение пользователя"
                                        src={comment.image}
                                    />
                                    <p className="date">{comment.create_at}</p>
                                    <h3 className="mobile-only">{comment.owner}</h3>
                                </div>
                                <div>
                                    <h3>{comment.owner}</h3>
                                    <p>{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="addComment">
                    <h2>
                        Обсуждение <span>{forum.comments.length}</span>
                    </h2>
                    <textarea placeholder="Напишите свой ответ"></textarea>
                    <button>Отправить</button>
                    <img alt="Игровой арт" src={image}/>
                </div>
            </div>
        </div>
    );
}

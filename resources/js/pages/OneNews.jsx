import React from "react";
import image from "../assets/img/one_news_image.png";
import image2 from "../assets/img/one_news_image.svg";

export default function OneNews() {
    const [news, setNews] = React.useState({
        id: 1,
        title: "Название новости",
        image: "./img/example.png",
        description:
            "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut enim ligula. Morbi et commodo risus. Curabitur lacinia metus mi, non convallis augue ultrices et. Praesent pellentesque dolor vitae tellus elementum, a luctus augue pretium. Curabitur non nulla metus. Nam accumsan massa nec pulvinar luctus. Fusce vel sem hendrerit, posuere massa sit amet, porta enim. Praesent ut neque sagittis, interdum felis sed, sollicitudin nunc. Sed mollis viverra molestie. Cras vestibulum at sapien sit amet sollicitudin. Cras molestie odio vitae mollis convallis. Morbi sit amet nisl porttitor ligula facilisis facilisis eget in orci. Ut eget pulvinar velit. Sed mollis lectus eu lacinia facilisis. Praesent in sem neque. Curabitur consequat vehicula sapien, non dignissim est convallis a. Vivamus volutpat vel sapien non mattis. Nulla malesuada pellentesque sem. Sed suscipit maximus sapien, vitae imperdiet felis laoreet non. Morbi elementum molestie velit, sit amet convallis tellus varius quis. Sed molestie luctus tincidunt. Suspendisse cursus vulputate tellus, consectetur fermentum dolor lobortis vitae. Donec elementum condimentum quam ac laoreet. Nullam ultrices mauris elit, sit amet faucibus lorem sagittis id. Aliquam pharetra leo risus, a vehicula tellus faucibus vitae. Phasellus volutpat sem quis mi euismod consectetur vitae vitae tortor. In tincidunt eu risus vel fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent tristique arcu vel eros auctor fringilla. Fusce vestibulum neque ut justo efficitur auctor. Cras lacinia feugiat tempus. Suspendisse sodales vitae dui eu efficitur. Ut elementum scelerisque tortor, ac porta metus aliquet et. Suspendisse vitae sapien id ipsum ornare cursus sed sit amet mi. Duis et sem id neque mollis posuere. Fusce vitae imperdiet nunc, malesuada consectetur magna. Quisque augue ex, luctus et laoreet et, fringilla et urna. Sed maximus ex enim, sit amet euismod libero pretium vitae. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus porta, eros id sollicitudin accumsan, sapien ante accumsan nibh, quis suscipit lorem tellus a libero.",
        comments: [
            {
                image: "../img/Example2.svg",
                name: "fantom_skitsa",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet tellus sit amet risus vulputate euismod. Nunc molestie urna sit amet enim euismod, non convallis felis tempor. Nam a aliquam massa, in consequat felis. Cras sollicitudin elementum mi, id sollicitudin est. Nulla malesuada cursus augue, non facilisis felis.",
            },
            {
                image: "../img/example.png",
                name: "aeaea",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet tellus sit amet risus vulputate euismod. Nunc molestie urna sit amet enim euismod, non convallis felis tempor. Nam a aliquam massa, in consequat felis. Cras sollicitudin elementum mi, id sollicitudin est. Nulla malesuada cursus augue, non facilisis felis.",
            },
        ],
    });
    return (
        <div className="OneNews">
            <h1 className="mobile-only">{news.title}</h1>
            <img alt="Изображение новости" src="../img/example.png" />
            <img alt="Изображение новости" src={image} className="back-image" />
            <img
                alt="Изображение новости"
                src={image2}
                className="back-shadow"
            />
            <div className="content">
                <h1 className="desktop-only">{news.title}</h1>
                <h2>Описание</h2>
                <p>{news.description}</p>
                <h2>Новость</h2>
                <p>{news.content}</p>
            </div>
            <div className="comments">
                <div className="list">
                    <div>
                        {news.comments.map((comment, i) => (
                            <div key={"one-news-page-comment-" + i}>
                                <div>
                                    <img
                                        alt="Изображение пользователя"
                                        src={comment.image}
                                    />
                                    <p>{comment.name}</p>
                                </div>
                                <p>{comment.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="addComment">
                    <h2>Комментарии</h2>
                    <textarea placeholder="Напишите комментарий"></textarea>
                    <button>Отправить</button>
                </div>
            </div>
        </div>
    );
}

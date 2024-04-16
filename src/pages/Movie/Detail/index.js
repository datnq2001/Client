import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMovieBySlugAction } from '../../../redux/actions/movieActions';
import moment from 'moment';
import ModalForm from '../components/ModalForm';

function MovieDetail() {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('synopsis'); // Mặc định chọn tab 'synopsis'
  const dispatch = useDispatch();
  const history = useHistory();

  const movie = {
    title: "Kung Fu Panda 4",
    slug: "kungfu-panda",
    poster: "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202402/11347_103_100002.jpg",
    genre: "Hoạt hình, Phiêu lưu",
    running_time: 115,
    release_date: "2024-03-08",
    director: 'Daxton Nguyen',
    actor: 'Quang Đạt',
    description: 'Trong Kung Fu Panda 4, gấu Po đang tận hưởng cuộc phiêu lưu hấp dẫn khi trở thành Thần Long Đại Hiệp. Nhưng sau một chuyến đi và trở về, sư phụ Shifu thông báo đây là thời điểm thích hợp để Po tìm người kế thừa cho vị trí Thần Long. Sau đó, Po sẽ đảm nhận vai trò thủ lĩnh tinh thần của Thung lũng Bình Yên. Tuy nhiên, Po cảm thấy điều này không hợp lý vì anh vẫn đang thực hiện tốt vai trò Thần Long Đại Hiệp của mình. Trong lúc suy ngẫm về lời khuyên của sư phụ, Po đã gặp gỡ một chú cáo tinh quái tên là Zhen. Cả hai đã có một trận đấu nhỏ trước khi Zhen đồng ý giúp Po tìm hiểu về Tắc Kè Hoa, một nhân vật phản diện mới có khả năng biến hình và sử dụng sức mạnh của mình để hóa thân thành tất cả những kẻ thù mạnh nhất mà Po từng đối mặt. Chuyến hành trình mới này tiếp tục mang đến những bài học mới cho Po và giúp anh tìm ra người kế thừa đúng đắn.'
    ,images: [
      'https://imgix.hoyts.com.au/movies/gallery/kung-fu-panda-4-6b678374.jpg?w=1920&fit=crop&auto=compress,format',
      'https://imgix.hoyts.com.au/movies/gallery/kung-fu-panda-4-09dd565a.jpg?w=1920&fit=crop&auto=compress,format',
      'https://imgix.hoyts.com.au/movies/gallery/kung-fu-panda-4-88ce4de2.jpg?w=1920&fit=crop&auto=compress,format',
      'https://cdn.vnreview.vn/589824_70849781286258_2317418324033536?wt=bd8a9613795ba835890f9c164e6a76f7&rt=f9283e96d9c7c6ebe99966db50c52780',
      'https://kenh14cdn.com/thumb_w/660/203336854389633024/2024/3/8/img5367-17098713692411428299926-17098785481041721565659.png'
    ]
  };

  const getYoutubeVideoId = (url) => {
    if (!url) {
      return null;
    }

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const VideoIframe = React.memo(({ src, height }) => (
    <iframe
      className="px-0 mb-0"
      title={movie.title}
      controls
      height={height}
      allowFullScreen
      src={src}
    />
  ));

  const ScrollToTopOnMount = () => {
    useLayoutEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return null;
  };

  useEffect(() => {
    dispatch(getMovieBySlugAction(slug, history));

    return () => {
      dispatch({
        type: 'REMOVE_MOVIE_DETAIL',
      });
    };
  }, [dispatch, slug, history]);

  const handleTabClick = (tabId) => {
   
    setActiveTab(tabId);
  };
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => Math.min(prevSlide + 1, movie.images.length - 1));
  };
  return (
    <main className="flex-shrink-0">
      
      <Container className="w-60">
        <Row>
          <div className='movie-detail-banner'>
            <img src='https://coolwallpapers.me/picsup/2618461-kung-fu-panda-4k-free-download-wallpaper.jpg' className='movie-detail-banner-image'></img>
            <Col className="px-0 md-3">
              <div>
                <Image src={movie.poster} className="img-cover"></Image>
              </div>
            </Col>
            <Col className='movie-detail-info'>
              <div style={{margin:'10px 0 5px 0'}}>
                <h5 className="fw-bold" style={{ fontSize: '32px', color: '#e71a0f' }}>{movie.title}</h5>
              </div>
              <hr className="my-1" />
              <div style={{marginBottom:'5px'}}>
                <span className="fw-bold">Đạo diễn: </span>
                <span>{movie.director}</span>
              </div>
              <div style={{marginBottom:'5px'}}>
                <span className="fw-bold">Khởi chiếu: </span>
                <span>{moment(movie.release_date).format('DD/MM/YYYY')}</span>
              </div>
              <div style={{marginBottom:'5px'}}>
                <span className="fw-bold">Thời lượng: </span>
                <span>{movie.running_time} phút</span>
              </div>
              <div style={{marginBottom:'5px'}}>
                <span className="fw-bold">Ngôn ngữ: </span>
                <span>Tiếng Anh - Phụ đề Tiếng Việt</span>
              </div>
              <a href='' style={{ textDecoration: 'none', color: 'white' }}>
                <div className='movie-detail__booking'>Booking Now</div>
              </a>
            </Col>
          </div>
        </Row>
        <div className='text-box'>
          <span className='heading'>Teasers and Trailers</span>
        </div>
        

        <Row className="mt-2 text-center">
          <div className="video-container">
            <div className="video-background" style={{ backgroundImage: `url('https://i.ytimg.com/vi/egkeFvm26pc/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCjJZ-QlFQgAusKHu-7ZOAh-EguUQ')` }}></div>
            <VideoIframe
              height={444}
              src={`https://www.youtube.com/embed/${getYoutubeVideoId(movie.trailer)}`}
            />
          </div>
        </Row>
        {/* Tabs */}
        <Row className="mt-2">
          <div className="tabs">
            <ul className="tabs-nav">
              <li className="tabs-nav__item">
                <button
                  className={`tabs-nav__button ${activeTab === 'synopsis' ? 'is-selected' : ''}`}
                  type="button"
                  onClick={() => handleTabClick('synopsis')}
                >
                  <span className="tabs-nav__text">Synopsis</span>
                </button>
              </li>
              <li className="tabs-nav__item">
                <button
                  className={`tabs-nav__button ${activeTab === 'details' ? 'is-selected' : ''}`}
                  type="button"
                  onClick={() => handleTabClick('details')}
                >
                  <span className="tabs-nav__text">Details</span>
                </button>
              </li>
            </ul>
            {/* Nội dung của tab */}
            <div className="tabs-content" id="synopsis" style={{ display: activeTab === 'synopsis' ? 'block' : 'none' }}>
              <div className="wysiwyg">
                <p>{movie.description}</p>
              </div>
            </div>
            <div className="tabs-content" id="details" style={{ display: activeTab === 'details' ? 'block' : 'none' }}>
              <div className="wysiwyg">
                <dl>
                  <dt>Director</dt>
                  <dd>{movie.director}</dd>
                  <dt>Cast</dt>
                  <dd>{movie.actor}</dd>
                  <dt>Genre</dt>
                  <dd>{movie.genre}</dd>
                  <dt>Release Date</dt>
                  <dd>{moment(movie.release_date).format('DD/MM/YYYY')}</dd>
                  <dt>Runtime</dt>
                  <dd>{movie.running_time} min</dd>
                </dl>
              </div>
            </div>
          </div>
        </Row>
        <div className='text-box'>
          <span className='heading'>Photo Gallery</span>
        </div>
        

        <Row className="mt-2 text-center">
          <div className='gallery-section'>
          <div className="gallery-container">
          <Row md={3} className='photo-gallery-flex' style={{ transform: `translateX(-${currentSlide * (100 / movie.images.length)}%)` }}>
            {movie.images.map((image,index) => (
                <Col className="d-flex align-items-end flex-column mt-3" style={{marginBottom:'30px'}} key={index}>
                  <Row className="movie-item">
                    <img className='photo-gallery__item' src={image}></img>
                  </Row>
                </Col>
            ))}
            </Row>
            
          </div>
          <div className="gallery-button gallery-button-prev" onClick={handlePrev}>{'<'}</div>
          <div className="gallery-button gallery-button-next" onClick={handleNext}>{'>'}</div>
          </div>
        </Row>
      </Container>
    </main>
  );
}

export default MovieDetail;

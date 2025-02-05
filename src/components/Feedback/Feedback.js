import { Button, Divider, Form, Input, Progress, Rate } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeedback } from "../../redux/feedbackSlice";
import { REACT_API_URL } from "../../utils/http";
import {
  calculateAverageRating,
  calculateRating,
  formatDate,
} from "../../utils/utils";

const Feedback = ({ productName, productId, userName }) => {
  const userData = useSelector((state) => state.user.profile);
  const feedback = useSelector((state) => state.feedback.feedback);
  const dispatch = useDispatch();

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  // Lấy danh sách đánh giá từ API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${REACT_API_URL}/feedback/${productId}`
        );
        if (response.data && Array.isArray(response.data.data)) {
          dispatch(setFeedback(response.data.data));
        } else {
          dispatch(setFeedback([])); // Nếu API không trả về mảng hợp lệ, gán mảng rỗng
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        dispatch(setFeedback([]));
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  // Gửi đánh giá mới
  const handleSubmit = async () => {
    const userId = userData._id;
    const newReview = { userName, rating, comment, productName, userId };
    try {
      const response = await axios.post(`${REACT_API_URL}/feedback`, newReview);
      // Dispatch action thay vì gọi setFeedback trực tiếp
      dispatch(setFeedback([...feedback, response.data.data]));
      setRating(1);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  const ratingPercentages = calculateRating(feedback);
  const averageRating = calculateAverageRating(feedback);

  return (
    <div className="p-5 my-4 bg-white rounded-lg">
      <div className="text-xl font-bold">Đánh Giá Sản Phẩm</div>
      <div className="grid grid-cols-2 gap-20 my-4">
        <div className="grid grid-cols-3 col-span-1 mt-3">
          <div className="col-span-1">
            <div className="my-10 text-center">
              <div className="text-5xl font-semibold">{averageRating}/5</div>
              <Rate disabled value={Math.round(averageRating)} />
              <div className="text-gray-400">
                {/* ( {feedback.length} đánh giá ) */}
              </div>
            </div>
          </div>
          <div className="col-span-2">
            {Object.keys(ratingPercentages).length > 0 ? (
              Array.from({ length: 5 }, (_, i) => 5 - i).map((rating) => (
                <div key={rating} className="flex gap-2 mb-1">
                  <div className="flex gap-2">
                    <div>{rating}</div>
                    <div>Sao</div>
                  </div>
                  <Progress
                    strokeColor="orange"
                    percent={parseFloat(ratingPercentages[rating])}
                    status={ratingPercentages[rating] > 0 ? "active" : "normal"}
                  />
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
        <Form className="col-span-1" layout="vertical" onFinish={handleSubmit}>
          <Form.Item>
            <Rate value={rating} onChange={(value) => setRating(value)} />
          </Form.Item>
          <Form.Item label="Viết đánh giá sản phẩm">
            <Input.TextArea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Nhập nhận xét của bạn về sản phẩm"
            />
          </Form.Item>
          <Button type="primary" danger htmlType="submit">
            Gửi Nhận Xét
          </Button>
        </Form>
      </div>

      <h2>Mới Nhất</h2>
      <Divider className="my-2" />
      <div>
        {Array.isArray(feedback) && feedback.length > 0 ? (
          feedback.map((review, index) => (
            <div
              key={review._id || index}
              className="flex flex-row gap-16 my-2"
            >
              <div className="gap-2 ">
                <div>{review.userName}</div>
                <div className="text-gray-400">
                  {formatDate(review.createdAt)}
                </div>
              </div>
              <div>
                <Rate disabled value={review.rating} />
                <div>{review.comment}</div>
              </div>
            </div>
          ))
        ) : (
          <p>Chưa có đánh giá nào.</p>
        )}
      </div>
    </div>
  );
};

export default Feedback;

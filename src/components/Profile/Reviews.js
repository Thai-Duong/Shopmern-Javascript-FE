import { Card, Col, Empty, Rate, Row, Typography } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeedback } from "../../redux/feedbackSlice";
import { REACT_API_URL } from "../../utils/http";

const { Title } = Typography;

const Reviews = ({ userData }) => {
  const feedback = useSelector((state) => state.feedback.feedback);
  const dispatch = useDispatch();

  // Hàm lấy thông tin đánh giá của người dùng
  const getUserReviews = (userId) => async () => {
    try {
      const response = await axios.get(
        `${REACT_API_URL}/feedback/user/${userId}`
      );
      if (Array.isArray(response.data.data)) {
        dispatch(setFeedback(response.data.data));
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    if (userData._id) {
      dispatch(getUserReviews(userData._id));
    }
  }, [dispatch, userData._id]);

  if (feedback.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Empty description="Chưa có đánh giá nào" />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* Layout hiển thị theo chiều ngang */}
      <Row gutter={[16, 16]}>
        {feedback.map((review) => (
          <Col span={24} key={review._id || review.id}>
            <Card hoverable style={{ width: "100%", marginBottom: "16px" }}>
              <Row align="middle" gutter={16}>
                <Col span={4}>
                  <Title level={5}>
                    {review.productName || "Tên sản phẩm không có"}
                  </Title>
                </Col>
                <Col span={16}>
                  <Rate disabled value={review.rating} />
                  <p>{review.comment}</p>
                </Col>
                <Col span={4}>
                  <div style={{ fontSize: "12px", color: "#888" }}>
                    {review.createdAt &&
                      new Date(review.createdAt).toLocaleString()}
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Reviews;

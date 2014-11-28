require 'test_helper'

class StoriesControllerTest < ActionController::TestCase
  setup do
    @story = stories(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:stories)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create story" do
    assert_difference('Story.count') do
      post :create, story: { age: @story.age, contact_a42: @story.contact_a42, content: @story.content, email: @story.email, gender: @story.gender, is_public: @story.is_public, moderator_status: @story.moderator_status, name: @story.name, region: @story.region, type: @story.type }
    end

    assert_redirected_to story_path(assigns(:story))
  end

  test "should show story" do
    get :show, id: @story
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @story
    assert_response :success
  end

  test "should update story" do
    put :update, id: @story, story: { age: @story.age, contact_a42: @story.contact_a42, content: @story.content, email: @story.email, gender: @story.gender, is_public: @story.is_public, moderator_status: @story.moderator_status, name: @story.name, region: @story.region, type: @story.type }
    assert_redirected_to story_path(assigns(:story))
  end

  test "should destroy story" do
    assert_difference('Story.count', -1) do
      delete :destroy, id: @story
    end

    assert_redirected_to stories_path
  end
end

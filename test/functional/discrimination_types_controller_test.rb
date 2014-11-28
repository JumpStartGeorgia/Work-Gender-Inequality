require 'test_helper'

class DiscriminationTypesControllerTest < ActionController::TestCase
  setup do
    @discrimination_type = discrimination_types(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:discrimination_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create discrimination_type" do
    assert_difference('DiscriminationType.count') do
      post :create, discrimination_type: { name: @discrimination_type.name }
    end

    assert_redirected_to discrimination_type_path(assigns(:discrimination_type))
  end

  test "should show discrimination_type" do
    get :show, id: @discrimination_type
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @discrimination_type
    assert_response :success
  end

  test "should update discrimination_type" do
    put :update, id: @discrimination_type, discrimination_type: { name: @discrimination_type.name }
    assert_redirected_to discrimination_type_path(assigns(:discrimination_type))
  end

  test "should destroy discrimination_type" do
    assert_difference('DiscriminationType.count', -1) do
      delete :destroy, id: @discrimination_type
    end

    assert_redirected_to discrimination_types_path
  end
end

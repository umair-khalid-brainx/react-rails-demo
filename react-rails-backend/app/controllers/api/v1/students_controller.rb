class Api::V1::StudentsController < ApplicationController
  before_action :set_student, only: [:edit, :update, :destroy]
  def index
    @students = Student.all
    render json: @students
  end

  def show
    @student = Student.find(params[:id])
    render json: @student
  end

  def create
    @student = Student.new(student_params)
    if @student.save
      render json: { message: 'Record Created successfully' }, status: :created
    else
      render json: @student.errors, status: :unprocessable_entity
    end
  end

   def edit
    render json: @student
  end

  def update
    if @student.update(student_params)
      render json: { message: 'Record Updated successfully' }, status: :ok
    else
      render json: @student.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @student.destroy
      render json: { message: 'Record Deleted successfully' }, status: :ok
    else
      render json: @student.errors, status: :unprocessable_entity
    end
  end

  private

  def student_params
    params.fetch(:student, {}).permit(:name, :email, :rollnumber)
  end

  def set_student
    @student = Student.find(params[:id])
  end
end

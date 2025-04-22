package storage

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"path/filepath"
	"test-task-app/models"
	"time"

	"github.com/google/uuid"
)

type TaskStorage struct {
	filePath string
}

func NewTaskStorage(dataDir string) *TaskStorage {
	return &TaskStorage{
		filePath: filepath.Join(dataDir, "tasks.json"),
	}
}

func (s *TaskStorage) GetTasks() ([]models.Task, error) {
	data, err := ioutil.ReadFile(s.filePath)
	if os.IsNotExist(err) {
		return []models.Task{}, nil
	}
	if err != nil {
		return nil, err
	}

	var tasks []models.Task
	err = json.Unmarshal(data, &tasks)
	return tasks, err
}

func (s *TaskStorage) AddTask(task *models.Task) error {
	tasks, err := s.GetTasks()
	if err != nil {
		return err
	}

	task.ID = uuid.New().String()
	task.CreatedAt = time.Now()
	task.UpdatedAt = time.Now()
	tasks = append(tasks, *task)

	return s.saveTasks(tasks)
}

func (s *TaskStorage) UpdateTask(task *models.Task) error {
	tasks, err := s.GetTasks()
	if err != nil {
		return err
	}

	for i, t := range tasks {
		if t.ID == task.ID {
			task.UpdatedAt = time.Now()
			tasks[i] = *task
			break
		}
	}

	return s.saveTasks(tasks)
}

func (s *TaskStorage) DeleteTask(taskID string) error {
	tasks, err := s.GetTasks()
	if err != nil {
		return err
	}

	for i, task := range tasks {
		if task.ID == taskID {
			tasks = append(tasks[:i], tasks[i+1:]...)
			break
		}
	}

	return s.saveTasks(tasks)
}

func (s *TaskStorage) saveTasks(tasks []models.Task) error {
	data, err := json.MarshalIndent(tasks, "", "  ")
	if err != nil {
		return err
	}

	return ioutil.WriteFile(s.filePath, data, 0644)
}

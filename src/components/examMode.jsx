// src/components/ - отдельные компоненты (карточки, кнопки, формы)

import React from 'react';

function ExamMode({ correctPercent, progress, time}) {
  return (
    <div id="exam-mode">
      <h3>Правильно отвечено <span id="correct-percent">{correctPercent}%</span></h3>
      <progress id="exam-progress" value={progress} max="100">
        {progress}%
      </progress>
      <p>Время тестирования <span id="time">{time}</span></p>
    </div>
  );
}

export default ExamMode;
<template>
  <div class="article-content">
    <h2>Введение</h2>
    <p>
      Прогнозирование временных рядов является одной из фундаментальных задач в
      финансовом анализе, позволяющей предсказать будущие значения финансовых
      показателей на основе исторических данных. Традиционные статистические
      методы, такие как ARIMA и экспоненциальное сглаживание, имеют существенные
      ограничения при работе с нелинейными зависимостями и долгосрочными
      паттернами. В последние годы методы глубокого обучения продемонстрировали
      значительный потенциал в решении этих проблем, особенно рекуррентные
      нейронные сети (RNN) и их варианты.
    </p>
    <p>
      В данной работе мы исследуем эффективность различных архитектур глубоких
      нейронных сетей для прогнозирования финансовых временных рядов и
      предлагаем новую гибридную архитектуру, сочетающую преимущества сетей с
      долгой краткосрочной памятью (LSTM) и механизмов внимания.
    </p>

    <h2>Обзор литературы</h2>
    <p>
      Прогнозирование финансовых временных рядов с использованием методов
      машинного обучения является активной областью исследования. Ранние работы
      были сосредоточены на применении многослойных персептронов (MLP) для этих
      задач, но их эффективность была ограничена из-за неспособности учитывать
      временную структуру данных.
    </p>
    <p>
      Рекуррентные нейронные сети, особенно LSTM и GRU, преодолели это
      ограничение и стали стандартным выбором для анализа временных рядов.
      Например, Fischer и Krauss (2018) продемонстрировали превосходство LSTM
      над традиционными методами при прогнозировании доходности акций на рынке
      S&P 500.
    </p>
    <p>
      В последнее время исследователи начали экспериментировать с механизмами
      внимания и архитектурами трансформеров для прогнозирования временных
      рядов. Li et al. (2019) предложили модель Transformer-based Time Series,
      которая показала многообещающие результаты на финансовых данных. Однако
      эти подходы требуют большого объема данных для эффективного обучения и
      могут быть чувствительны к шуму.
    </p>

    <h2>Методология</h2>
    <h3>Данные и предобработка</h3>
    <p>
      В нашем исследовании мы использовали дневные данные о ценах акций 50
      крупнейших компаний, входящих в индекс S&P 500, за период с января 2010 по
      декабрь 2022 года. Для каждой компании мы собрали следующие показатели:
    </p>
    <ul>
      <li>Цена открытия (Open)</li>
      <li>Максимальная цена (High)</li>
      <li>Минимальная цена (Low)</li>
      <li>Цена закрытия (Close)</li>
      <li>Объем торгов (Volume)</li>
    </ul>
    <p>
      Дополнительно мы рассчитали технические индикаторы, включая скользящие
      средние (MA), индекс относительной силы (RSI), MACD и Bollinger Bands. Все
      данные были нормализованы с использованием метода мин-макс нормализации в
      скользящем окне длиной 20 дней, чтобы избежать проблемы прямой утечки
      данных.
    </p>

    <h3>Предлагаемая архитектура</h3>
    <p>
      Мы разработали гибридную архитектуру, которую назвали Attention-Enhanced
      LSTM (AE-LSTM), сочетающую преимущества LSTM и механизмов внимания.
      Архитектура состоит из следующих компонентов:
    </p>
    <ol>
      <li>
        <strong>Слой кодирования временных признаков</strong> — сверточный слой
        с окном размером 3, который извлекает локальные паттерны из исходных
        временных рядов.
      </li>
      <li>
        <strong>Двунаправленный LSTM</strong> — захватывает долгосрочные
        зависимости в обоих направлениях временного ряда.
      </li>
      <li>
        <strong>Механизм временного внимания</strong> — позволяет модели
        фокусироваться на наиболее важных временных шагах при формировании
        прогноза.
      </li>
      <li>
        <strong>Полносвязные слои</strong> — для окончательного прогнозирования
        на основе признаков, выделенных предыдущими слоями.
      </li>
    </ol>
    <p>Архитектура модели представлена на рисунке ниже:</p>

    <div class="image-placeholder">
      <i class="far fa-image"></i>
      <p>Рисунок 1: Архитектура предлагаемой модели AE-LSTM</p>
    </div>

    <h3>Сравниваемые модели</h3>
    <p>
      Для оценки эффективности нашей модели мы сравнили её с несколькими
      базовыми моделями:
    </p>
    <ul>
      <li>
        ARIMA — классическая статистическая модель для анализа временных рядов
      </li>
      <li>Простой MLP — многослойный персептрон с тремя скрытыми слоями</li>
      <li>Стандартный LSTM — однонаправленная LSTM без механизма внимания</li>
      <li>Двунаправленный LSTM (BiLSTM) — без механизма внимания</li>
      <li>
        Temporal Convolutional Network (TCN) — сеть на основе одномерных сверток
        с расширенным полем восприятия
      </li>
    </ul>

    <h2>Экспериментальные результаты</h2>
    <h3>Метрики оценки</h3>
    <p>
      Для оценки точности прогнозирования мы использовали следующие метрики:
    </p>
    <ul>
      <li>Средняя абсолютная ошибка (MAE)</li>
      <li>Средняя квадратичная ошибка (MSE)</li>
      <li>Средняя абсолютная процентная ошибка (MAPE)</li>
      <li>Коэффициент Тейла (U)</li>
    </ul>

    <h3>Результаты сравнения</h3>
    <p>
      Результаты сравнения моделей на основе прогнозирования цен закрытия акций
      с горизонтом в 5 дней представлены в таблице 1:
    </p>

    <table class="results-table">
      <thead>
        <tr>
          <th>Модель</th>
          <th>MAE</th>
          <th>MSE</th>
          <th>MAPE (%)</th>
          <th>Коэффициент Тейла</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ARIMA</td>
          <td>2.87</td>
          <td>12.45</td>
          <td>3.52</td>
          <td>0.384</td>
        </tr>
        <tr>
          <td>MLP</td>
          <td>2.53</td>
          <td>9.68</td>
          <td>3.11</td>
          <td>0.316</td>
        </tr>
        <tr>
          <td>LSTM</td>
          <td>1.98</td>
          <td>6.14</td>
          <td>2.43</td>
          <td>0.247</td>
        </tr>
        <tr>
          <td>BiLSTM</td>
          <td>1.76</td>
          <td>5.22</td>
          <td>2.15</td>
          <td>0.221</td>
        </tr>
        <tr>
          <td>TCN</td>
          <td>1.82</td>
          <td>5.73</td>
          <td>2.23</td>
          <td>0.235</td>
        </tr>
        <tr>
          <td>AE-LSTM (наша)</td>
          <td>1.53</td>
          <td>4.16</td>
          <td>1.87</td>
          <td>0.198</td>
        </tr>
      </tbody>
    </table>

    <p>
      Как видно из результатов, предложенная модель AE-LSTM превосходит все
      базовые модели по всем метрикам. Особенно примечательно улучшение на 13%
      по MAPE и 18% по MSE по сравнению с BiLSTM, что подтверждает эффективность
      включения механизма внимания.
    </p>

    <h3>Визуализация прогнозов</h3>
    <p>
      На рисунке 2 представлено сравнение фактических и прогнозируемых значений
      цен закрытия для одной из компаний из тестового набора:
    </p>

    <div class="image-placeholder">
      <i class="far fa-image"></i>
      <p>Рисунок 2: Сравнение фактических и прогнозируемых значений</p>
    </div>

    <h3>Анализ внимания</h3>
    <p>
      Одним из преимуществ предложенной архитектуры является интерпретируемость
      благодаря механизму внимания. На рисунке 3 мы визуализировали веса
      внимания для разных временных точек при формировании прогноза:
    </p>

    <div class="image-placeholder">
      <i class="far fa-image"></i>
      <p>Рисунок 3: Визуализация весов внимания</p>
    </div>

    <p>
      Анализ показывает, что модель придает наибольшее значение недавним данным
      (последние 3-5 дней), но также учитывает определенные более ранние точки,
      которые могут соответствовать важным рыночным событиям.
    </p>

    <h2>Обсуждение и выводы</h2>
    <p>
      Результаты нашего исследования демонстрируют значительное преимущество
      методов глубокого обучения, особенно гибридных архитектур, над
      традиционными статистическими методами для прогнозирования финансовых
      временных рядов. Предложенная модель AE-LSTM успешно сочетает способность
      LSTM к моделированию долгосрочных зависимостей с селективным фокусом
      механизма внимания на наиболее информативных временных точках.
    </p>
    <p>
      Важно отметить, что эффективность модели может варьироваться в зависимости
      от конкретного финансового инструмента и рыночных условий. В периоды
      высокой волатильности или структурных изменений на рынке точность
      прогнозирования снижается для всех моделей, хотя AE-LSTM демонстрирует
      большую устойчивость в таких условиях.
    </p>
    <p>
      В будущих исследованиях мы планируем расширить нашу модель для включения
      внешних факторов, таких как макроэкономические показатели и новостные
      события, а также исследовать возможность использования мультимодальных
      данных для повышения точности прогнозирования.
    </p>

    <h2>Список литературы</h2>
    <ol class="references">
      <li>
        Fischer, T., Krauss, C. (2018). Deep learning with long short-term
        memory networks for financial market predictions. European Journal of
        Operational Research, 270(2), 654-669.
      </li>
      <li>
        Li, S., Jin, X., Xuan, Y., Zhou, X., Chen, W., Wang, Y. X., & Yan, X.
        (2019). Enhancing the locality and breaking the memory bottleneck of
        transformer on time series forecasting. In Advances in Neural
        Information Processing Systems (pp. 5243-5253).
      </li>
      <li>
        Hochreiter, S., & Schmidhuber, J. (1997). Long short-term memory. Neural
        computation, 9(8), 1735-1780.
      </li>
      <li>
        Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez,
        A. N., Kaiser, L., & Polosukhin, I. (2017). Attention is all you need.
        In Advances in neural information processing systems (pp. 5998-6008).
      </li>
      <li>
        Bai, S., Kolter, J. Z., & Koltun, V. (2018). An empirical evaluation of
        generic convolutional and recurrent networks for sequence modeling.
        arXiv preprint arXiv:1803.01271.
      </li>
      <li>
        Box, G. E., Jenkins, G. M., Reinsel, G. C., & Ljung, G. M. (2015). Time
        series analysis: forecasting and control. John Wiley & Sons.
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "ArticleContent2",
};
</script>

<style scoped>
.article-content {
  font-family: "Open Sans", sans-serif;
  line-height: 1.7;
  color: #333;
}

.article-content h2 {
  font-family: "Montserrat", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2a4d80;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-content h3 {
  font-family: "Roboto", sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.article-content p {
  margin-bottom: 1rem;
}

.article-content ul,
.article-content ol {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.article-content li {
  margin-bottom: 0.5rem;
}

.article-content strong {
  font-weight: 600;
  color: #444;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  font-size: 0.9rem;
}

.results-table th,
.results-table td {
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  text-align: center;
}

.results-table th {
  background-color: #f5f8fc;
  font-weight: 600;
  color: #2a4d80;
}

.results-table tr:nth-child(even) {
  background-color: #f9fbff;
}

.results-table tr:last-child {
  background-color: #f0f5ff;
  font-weight: 600;
}

.image-placeholder {
  background-color: #f5f8fc;
  border: 1px dashed #ccc;
  border-radius: 4px;
  padding: 3rem 1rem;
  text-align: center;
  margin: 2rem 0;
  color: #888;
}

.image-placeholder i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.image-placeholder p {
  margin: 0;
  font-style: italic;
  font-size: 0.9rem;
}

.references {
  margin-top: 2rem;
  counter-reset: ref-counter;
  list-style-type: none;
  padding-left: 0;
}

.references li {
  counter-increment: ref-counter;
  margin-bottom: 0.75rem;
  padding-left: 2rem;
  position: relative;
  font-size: 0.95rem;
}

.references li::before {
  content: "[" counter(ref-counter) "]";
  position: absolute;
  left: 0;
  color: #5790dc;
  font-weight: 600;
}

@media (max-width: 768px) {
  .results-table {
    font-size: 0.8rem;
  }

  .results-table th,
  .results-table td {
    padding: 0.5rem;
  }
}
</style>

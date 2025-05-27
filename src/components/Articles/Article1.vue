<template>
  <div class="article-content">
    <h2>Введение</h2>
    <p>
      В последние годы нейронные сети стали неотъемлемой частью систем
      компьютерного зрения, обеспечивая прорывы в таких задачах, как
      распознавание объектов, детекция и сегментация. Однако высокая
      вычислительная сложность современных архитектур и значительные требования
      к объему памяти затрудняют их развертывание на устройствах с ограниченными
      ресурсами. В данной работе мы представляем новый подход к оптимизации
      нейросетевых архитектур, сохраняющий точность распознавания при
      значительном сокращении вычислительных затрат.
    </p>

    <h2>Обзор существующих решений</h2>
    <p>
      Традиционные подходы к оптимизации нейронных сетей можно разделить на
      несколько категорий:
    </p>
    <ul>
      <li>Квантизация весов (снижение точности представления параметров)</li>
      <li>Прореживание (удаление несущественных связей)</li>
      <li>Дистилляция знаний (передача знаний от "учителя" к "ученику")</li>
      <li>Эффективные архитектуры (MobileNet, EfficientNet и др.)</li>
      <li>Аппаратно-специфичная оптимизация</li>
    </ul>
    <p>
      Каждый из этих подходов имеет свои преимущества и ограничения. Например,
      квантизация весов позволяет существенно сократить объем занимаемой памяти,
      но может привести к снижению точности при высоких степенях квантизации.
      Прореживание сетей может уменьшить количество параметров, но не всегда
      приводит к реальному ускорению на современных ускорителях.
    </p>

    <h2>Предлагаемый метод</h2>
    <p>
      Наш подход основан на комбинировании нескольких техник оптимизации с
      учетом их взаимного влияния. В частности, мы предлагаем:
    </p>
    <ol>
      <li>
        <strong>Адаптивное прореживание каналов</strong> — вместо удаления
        отдельных весов, мы удаляем целые каналы свертки на основе их важности,
        что обеспечивает реальное ускорение на современных GPU и NPU.
      </li>
      <li>
        <strong>Структурированная дистилляция знаний</strong> — передача знаний
        от большой модели к малой с акцентом на промежуточные признаки на уровне
        канала, а не только на выходные вероятности.
      </li>
      <li>
        <strong>Оптимизированное квантование</strong> — с применением смешанной
        точности, где наиболее чувствительные слои сохраняют более высокую
        разрядность.
      </li>
    </ol>

    <h2>Экспериментальная оценка</h2>
    <p>
      Для оценки эффективности предложенного подхода мы провели серию
      экспериментов на различных архитектурах нейронных сетей (ResNet-50,
      MobileNetV2, EfficientNet-B0) и наборах данных (ImageNet, COCO).
    </p>
    <p>
      Результаты представлены в таблице 1, где показано влияние оптимизации на
      точность и вычислительные затраты:
    </p>

    <table class="results-table">
      <thead>
        <tr>
          <th>Модель</th>
          <th>Метод оптимизации</th>
          <th>Точность Top-1 (%)</th>
          <th>Сокращение параметров (%)</th>
          <th>Ускорение (×)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ResNet-50</td>
          <td>Исходная</td>
          <td>76.3</td>
          <td>-</td>
          <td>1.0</td>
        </tr>
        <tr>
          <td>ResNet-50</td>
          <td>Прореживание (50%)</td>
          <td>74.8</td>
          <td>50.0</td>
          <td>1.8</td>
        </tr>
        <tr>
          <td>ResNet-50</td>
          <td>Квантизация (INT8)</td>
          <td>75.4</td>
          <td>75.0</td>
          <td>2.3</td>
        </tr>
        <tr>
          <td>ResNet-50</td>
          <td>Наш метод</td>
          <td>75.9</td>
          <td>78.5</td>
          <td>3.2</td>
        </tr>
        <tr>
          <td>MobileNetV2</td>
          <td>Исходная</td>
          <td>72.0</td>
          <td>-</td>
          <td>1.0</td>
        </tr>
        <tr>
          <td>MobileNetV2</td>
          <td>Наш метод</td>
          <td>71.5</td>
          <td>65.3</td>
          <td>2.7</td>
        </tr>
      </tbody>
    </table>

    <p>
      Как видно из результатов, наш подход обеспечивает более эффективную
      оптимизацию по сравнению с применением отдельных методов. Особенно важно
      отметить, что падение точности при использовании нашего метода минимально
      при значительном сокращении вычислительных затрат.
    </p>

    <h2>Визуализация результатов</h2>
    <p>
      На рисунке 1 показаны карты активаций для исходной и оптимизированной
      моделей. Обратите внимание, что оптимизированная модель сохраняет значимые
      активации, фокусируясь на наиболее информативных областях изображения.
    </p>

    <div class="image-placeholder">
      <i class="far fa-image"></i>
      <p>Рисунок 1: Карты активаций для исходной и оптимизированной моделей</p>
    </div>

    <h2>Заключение</h2>
    <p>
      В данной работе мы представили комплексный подход к оптимизации
      нейросетевых архитектур для задач распознавания визуальных паттернов. Наш
      метод объединяет преимущества различных подходов к оптимизации и учитывает
      их взаимное влияние, что позволяет достичь лучшего баланса между точностью
      и вычислительной эффективностью.
    </p>
    <p>
      Результаты экспериментов на различных архитектурах и наборах данных
      подтверждают эффективность предложенного подхода. В частности, нам удалось
      сократить количество параметров ResNet-50 на 78.5% и ускорить её в 3.2
      раза при падении точности всего на 0.4 процентных пункта.
    </p>
    <p>
      В будущих работах мы планируем расширить наш подход для других типов
      нейронных сетей, включая трансформеры и генеративные модели, а также
      исследовать возможность автоматического подбора оптимальных параметров
      оптимизации для конкретных аппаратных платформ.
    </p>

    <h2>Благодарности</h2>
    <p>
      Работа выполнена при поддержке гранта Российского научного фонда (проект №
      22-11-00000).
    </p>

    <h2>Список литературы</h2>
    <ol class="references">
      <li>
        He, K., Zhang, X., Ren, S., Sun, J. (2016). Deep residual learning for
        image recognition. CVPR 2016.
      </li>
      <li>
        Howard, A. G., Zhu, M., Chen, B., et al. (2017). MobileNets: Efficient
        convolutional neural networks for mobile vision applications. arXiv
        preprint arXiv:1704.04861.
      </li>
      <li>
        Hinton, G., Vinyals, O., Dean, J. (2015). Distilling the knowledge in a
        neural network. NIPS Deep Learning Workshop.
      </li>
      <li>
        Tan, M., Le, Q. (2019). EfficientNet: Rethinking model scaling for
        convolutional neural networks. ICML 2019.
      </li>
      <li>
        Jacob, B., Kligys, S., Chen, B., et al. (2018). Quantization and
        training of neural networks for efficient integer-arithmetic-only
        inference. CVPR 2018.
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "ArticleContent1",
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

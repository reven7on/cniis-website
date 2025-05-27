<template>
  <div class="article-content">
    <h2>Введение</h2>
    <p>
      Сегментация медицинских изображений является одной из ключевых задач в
      медицинской визуализации и диагностике. Она позволяет автоматически
      выделять области интереса, такие как органы, ткани, патологические
      образования, что значительно облегчает работу врачей-диагностов. В
      последние годы глубокое обучение продемонстрировало впечатляющие
      результаты в этой области, особенно архитектуры на основе U-Net. Однако
      они по-прежнему сталкиваются с проблемами точности сегментации сложных
      структур, особенно когда границы между тканями нечеткие или присутствуют
      шумы и артефакты.
    </p>
    <p>
      В данной работе мы представляем усовершенствованную архитектуру для
      сегментации медицинских изображений, которая объединяет преимущества U-Net
      и механизмов внимания для более точного выделения сложных анатомических
      структур.
    </p>

    <h2>Обзор существующих методов</h2>
    <p>
      Первые подходы к сегментации медицинских изображений основывались на
      традиционных методах обработки изображений, таких как пороговая обработка,
      выращивание областей и водораздел. Эти методы требовали тщательной ручной
      настройки параметров и часто не справлялись с вариативностью медицинских
      изображений.
    </p>
    <p>
      Архитектура U-Net, предложенная Ronneberger et al. в 2015 году, стала
      прорывом в области сегментации медицинских изображений благодаря своей
      энкодер-декодерной структуре с пропускными соединениями, которые сохраняют
      пространственную информацию. Дальнейшие работы, такие как V-Net и nnU-Net,
      улучшили эту архитектуру для работы с трехмерными изображениями и
      автоматической настройки параметров.
    </p>
    <p>
      В последние годы механизмы внимания, вдохновленные архитектурой
      Transformer, показали значительное улучшение результатов в задачах
      компьютерного зрения. Такие архитектуры, как Attention U-Net и TransUNet,
      комбинируют традиционные свёрточные подходы с механизмами внимания,
      позволяя модели фокусироваться на наиболее важных областях изображения.
    </p>

    <h2>Предлагаемый метод</h2>
    <h3>Архитектура ADA-UNet</h3>
    <p>
      Мы предлагаем новую архитектуру Adaptive Dual-Attention U-Net (ADA-UNet),
      которая расширяет классическую U-Net с двумя взаимодополняющими
      механизмами внимания:
    </p>
    <ol>
      <li>
        <strong>Пространственный механизм внимания</strong> — позволяет модели
        автоматически фокусироваться на наиболее информативных областях
        изображения, что особенно важно для выделения малых патологических
        образований.
      </li>
      <li>
        <strong>Канальный механизм внимания</strong> — динамически взвешивает
        важность различных признаков (каналов), полученных на разных уровнях
        свёрточной сети.
      </li>
    </ol>
    <p>
      Дополнительно мы вводим адаптивные блоки рекалибровки, которые
      автоматически настраивают глубину сети и параметры свёрток в зависимости
      от сложности сегментируемых структур и характеристик входного изображения.
    </p>
    <p>Архитектура предлагаемой модели представлена на рисунке 1:</p>

    <div class="image-placeholder">
      <i class="far fa-image"></i>
      <p>Рисунок 1: Архитектура предлагаемой модели ADA-UNet</p>
    </div>

    <h3>Функция потерь</h3>
    <p>
      Для обучения нашей модели мы используем комбинированную функцию потерь,
      учитывающую как общую структуру сегментируемой области, так и точность её
      границ:
    </p>

    <p class="formula">
      L = αL<sub>Dice</sub> + βL<sub>BCE</sub> + γL<sub>Boundary</sub>
    </p>

    <p>
      где L<sub>Dice</sub> — коэффициент Дайса, L<sub>BCE</sub> — бинарная
      кросс-энтропия, L<sub>Boundary</sub> — специализированная функция потерь
      для точной сегментации границ, а α, β, γ — весовые коэффициенты.
    </p>

    <h2>Экспериментальные данные</h2>
    <h3>Наборы данных</h3>
    <p>
      Для оценки эффективности предложенного метода мы использовали три
      общедоступных набора данных:
    </p>
    <ul>
      <li>
        <strong>ISIC 2018</strong> — набор дерматоскопических изображений для
        сегментации поражений кожи (2594 изображения).
      </li>
      <li>
        <strong>BraTS 2020</strong> — набор МРТ-изображений головного мозга для
        сегментации опухолей (369 случаев с четырьмя модальностями МРТ).
      </li>
      <li>
        <strong>KiTS19</strong> — набор КТ-изображений для сегментации почек и
        опухолей почек (210 КТ-исследований).
      </li>
    </ul>

    <h3>Протокол оценки</h3>
    <p>
      Для каждого набора данных мы применили пятикратную перекрестную валидацию.
      Для оценки качества сегментации использовались следующие метрики:
    </p>
    <ul>
      <li>Коэффициент Дайса (DSC)</li>
      <li>Чувствительность (Recall)</li>
      <li>Специфичность (Specificity)</li>
      <li>95-процентиль расстояния Хаусдорфа (HD95)</li>
    </ul>

    <h2>Результаты</h2>
    <h3>Количественная оценка</h3>
    <p>
      В таблице 1 представлены результаты сравнения нашего метода с
      существующими подходами на наборе данных ISIC 2018:
    </p>

    <table class="results-table">
      <thead>
        <tr>
          <th>Метод</th>
          <th>DSC (%)</th>
          <th>Recall (%)</th>
          <th>Specificity (%)</th>
          <th>HD95 (пиксели)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>U-Net</td>
          <td>85.27</td>
          <td>84.18</td>
          <td>97.32</td>
          <td>16.28</td>
        </tr>
        <tr>
          <td>Attention U-Net</td>
          <td>87.82</td>
          <td>86.54</td>
          <td>97.89</td>
          <td>14.41</td>
        </tr>
        <tr>
          <td>DeepLabV3+</td>
          <td>88.37</td>
          <td>87.64</td>
          <td>98.04</td>
          <td>13.05</td>
        </tr>
        <tr>
          <td>TransUNet</td>
          <td>89.23</td>
          <td>88.10</td>
          <td>98.21</td>
          <td>11.87</td>
        </tr>
        <tr>
          <td>ADA-UNet (наш)</td>
          <td>91.68</td>
          <td>90.33</td>
          <td>98.75</td>
          <td>9.16</td>
        </tr>
      </tbody>
    </table>

    <p>
      Аналогичные улучшения наблюдаются и на других наборах данных. На BraTS
      2020 наш метод достиг среднего DSC 0.892 для опухолевого ядра, а на KiTS19
      — 0.946 для сегментации почек и 0.834 для опухолей почек.
    </p>

    <h3>Качественная оценка</h3>
    <p>
      На рисунке 2 представлены примеры сегментации, полученные различными
      методами:
    </p>

    <div class="image-placeholder">
      <i class="far fa-image"></i>
      <p>Рисунок 2: Качественное сравнение результатов сегментации</p>
    </div>

    <p>
      Как видно из примеров, наш метод обеспечивает более точные границы
      сегментации и лучше выделяет сложные структуры с малым контрастом.
    </p>

    <h3>Анализ влияния компонентов</h3>
    <p>
      Для оценки вклада отдельных компонентов предложенной архитектуры мы
      провели абляционное исследование. Результаты представлены в таблице 2:
    </p>

    <table class="results-table">
      <thead>
        <tr>
          <th>Конфигурация</th>
          <th>DSC (%)</th>
          <th>HD95 (пиксели)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Базовая U-Net</td>
          <td>85.27</td>
          <td>16.28</td>
        </tr>
        <tr>
          <td>+ Пространственное внимание</td>
          <td>88.44</td>
          <td>13.67</td>
        </tr>
        <tr>
          <td>+ Канальное внимание</td>
          <td>90.16</td>
          <td>11.31</td>
        </tr>
        <tr>
          <td>+ Адаптивная рекалибровка</td>
          <td>91.68</td>
          <td>9.16</td>
        </tr>
      </tbody>
    </table>

    <p>
      Результаты показывают, что каждый компонент вносит существенный вклад в
      улучшение качества сегментации, при этом их совместное использование даёт
      синергетический эффект.
    </p>

    <h2>Обсуждение и выводы</h2>
    <p>
      В данной работе мы представили новую архитектуру для сегментации
      медицинских изображений, которая объединяет преимущества U-Net с двойным
      механизмом внимания и адаптивной рекалибровкой. Экспериментальные
      результаты на трех различных наборах медицинских данных подтверждают
      эффективность предложенного подхода.
    </p>
    <p>
      Наибольшее преимущество нашего метода наблюдается при сегментации структур
      со сложной морфологией и нечеткими границами. Это особенно важно для
      клинических приложений, где точность выделения границ патологических
      образований критична для диагностики и планирования лечения.
    </p>
    <p>
      Следует отметить, что включение двойного механизма внимания увеличивает
      вычислительную сложность модели, однако предложенная адаптивная
      рекалибровка позволяет частично компенсировать это увеличение за счет
      оптимизации архитектуры для конкретной задачи.
    </p>
    <p>
      В будущих работах мы планируем расширить наш подход для 3D-сегментации и
      исследовать возможность его применения в реальных клинических условиях с
      ограниченными вычислительными ресурсами.
    </p>

    <h2>Благодарности</h2>
    <p>
      Исследование выполнено при финансовой поддержке Российского фонда
      фундаментальных исследований (РФФИ) в рамках научного проекта №
      20-37-90144.
    </p>

    <h2>Список литературы</h2>
    <ol class="references">
      <li>
        Ronneberger, O., Fischer, P., & Brox, T. (2015). U-net: Convolutional
        networks for biomedical image segmentation. MICCAI 2015.
      </li>
      <li>
        Milletari, F., Navab, N., & Ahmadi, S. A. (2016). V-net: Fully
        convolutional neural networks for volumetric medical image segmentation.
        3D Vision (3DV) 2016.
      </li>
      <li>
        Isensee, F., Jaeger, P. F., Kohl, S. A., Petersen, J., & Maier-Hein, K.
        H. (2021). nnU-Net: a self-configuring method for deep learning-based
        biomedical image segmentation. Nature Methods, 18(2), 203-211.
      </li>
      <li>
        Oktay, O., Schlemper, J., Folgoc, L. L., Lee, M., Heinrich, M., Misawa,
        K., ... & Glocker, B. (2018). Attention u-net: Learning where to look
        for the pancreas. MIDL 2018.
      </li>
      <li>
        Chen, L. C., Zhu, Y., Papandreou, G., Schroff, F., & Adam, H. (2018).
        Encoder-decoder with atrous separable convolution for semantic image
        segmentation. ECCV 2018.
      </li>
      <li>
        Chen, J., Lu, Y., Yu, Q., Luo, X., Adeli, E., Wang, Y., ... & Zhou, Y.
        (2021). Transunet: Transformers make strong encoders for medical image
        segmentation. arXiv preprint arXiv:2102.04306.
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "ArticleContent3",
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

.formula {
  text-align: center;
  font-family: "Times New Roman", Times, serif;
  font-size: 1.1rem;
  margin: 1.5rem 0;
  padding: 0.5rem;
  background-color: #f9fbff;
  border-radius: 4px;
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
